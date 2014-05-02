#!/Program Files (x86)/IronPython 2.7/ipy64
#based on code by Jeff Kaufman 
#Boston Apartment Prices 2011
#http://www.jefftk.com/apartment_prices/index#2014-03-18&room


import time
import sys
import urllib
import json
import time
import datetime


CITY = "US"
MIN_LAT=24.926295
MAX_LAT=49.095452
MIN_LON=-126.137697
MAX_LON=-66.408692


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
        for rent in range(200,MAX_RENT,500):
            print "querying from $%s ..." % rent
            for bedrooms in range(2):
                #print('bedrooms')
                kwargs['minRent'] = rent
                kwargs['maxRent'] = rent+500
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




for i in range(260,300):
    for j in range(71,120):
        CITY = "us_%s_%s_" %(i,j)
        MIN_LAT=24.926295 + (j*0.2)
        MAX_LAT=24.926295 + ((j+1)*0.2)
        MIN_LON=-126.137697 + (i*0.2)
        MAX_LON=-126.137697 + ((i+1)*0.2)
        start()

