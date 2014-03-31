#!/Program Files (x86)/IronPython 2.7/ipy64
#based on code by Jeff Kaufman
#http://www.jefftk.com/apartment_prices/index#2014-03-18&room

import time
import sys
import urllib
import json
import time
import datetime

json_data=open("cities.json")
data=json.load(json_data)

CITY = data["cities"][0]["CITY"]
MIN_LAT=data["cities"][0]["MIN_LAT"]
MAX_LAT=data["cities"][0]["MAX_LAT"]
MIN_LON=data["cities"][0]["MIN_LON"]
MAX_LON=data["cities"][0]["MAX_LON"]


MAX_RENT=6025


DEFAULTS = {
    'cities': 'false',
    'showPOI': 'false',
    'limit': 2000,
    'minRent': 0,
    'maxRent': 6000,
    'searchTerms': '',
    'maxPricePerBedroom': 6000,
    'minBR': 0,
    'maxBR': 10,
    'minBA': 1,
    'maxAge': 7,
    'imagesOnly': 'false',
    'phoneReq': 'false',
    'cats': 'false',
    'dogs': 'false',
    'noFee': 'false',
    'showSubs': 'true',
    'showNonSubs': 'true',
    'showRooms': 'true',
    'userId': -1,
    'cl': 'true',
    'apts': 'true',
    'ood': 'true',
    'zoom': 15,
    'favsOnly': 'false',
    'onlyHQ': 'true',
    'showHidden': 'false',
    'workplaceLat': 0,
    'workplaceLong': 0,
    'maxTime': 0
    }

def query(kwargs):
    assert 'eastLong' in kwargs
    assert 'northLat' in kwargs
    assert 'westLong' in kwargs
    assert 'southLat' in kwargs

    url='https://www.padmapper.com/reloadMarkersJSON.php'

    full_url = '%s?%s' % (url, '&'.join('%s=%s' % (k,v) for (k,v) in kwargs.items()))

    apts = []

    txt = ""
    try:
        txt = urllib.urlopen(full_url).read()
        j = json.loads(txt)
    except Exception, e:
        print "ERROR", e
        print "ERROR", txt
        print "ERROR", full_url
        return []

    for apartment in j:
        apts.append(( apartment['id'], apartment['lng'], apartment['lat'] ))

    assert len(apts) < kwargs['limit']-1

    return apts

def start():
    kwargs = dict((k,v) for (k,v) in DEFAULTS.items())
    kwargs['southLat']=MIN_LAT
    kwargs['westLong']=MIN_LON
    kwargs['northLat']=MAX_LAT
    kwargs['eastLong']=MAX_LON

    print(kwargs['southLat'])
    print(kwargs['westLong'])
    print(kwargs['northLat'])
    print(kwargs['eastLong'])

    seen_ids = set()

    date_timestamp = datetime.datetime.now().strftime('%Y%m%d')
    print(date_timestamp)
    epoch_timestamp = int(time.mktime(time.gmtime()))
    with open("data/apt-%s-%s.csv" % (CITY,date_timestamp), 'w') as outf:
        for rent in range(100,MAX_RENT,25):
            print "querying from $%s ..." % rent
            for bedrooms in range(2):
                #print('bedrooms')
                kwargs['minRent'] = rent-25
                kwargs['maxRent'] = rent
                kwargs['minBR'] = bedrooms
                kwargs['maxBR'] = bedrooms

                for apt_id, lat, lon in query(kwargs):
                    #print('apt_id')
                    if apt_id not in seen_ids:
                        #print('writing')
                        outf.write("%s,%s,%s,%s,%s,%s\n" % (
                                rent, bedrooms, apt_id, lat, lon,date_timestamp))
                        sys.stdout.flush()
                        seen_ids.add(apt_id)
                        #print('done writing')
                time.sleep(1)



while(True):
    for i in range(len(data["cities"])):
        CITY = data["cities"][i]["CITY"]
        MIN_LAT=data["cities"][i]["MIN_LAT"]
        MAX_LAT=data["cities"][i]["MAX_LAT"]
        MIN_LON=data["cities"][i]["MIN_LON"]
        MAX_LON=data["cities"][i]["MAX_LON"]
        start()
       
    print "go to sleep"
    time.sleep(86400)
