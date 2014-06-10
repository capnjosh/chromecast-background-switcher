#! /usr/bin/python

import cgi, json, urllib, base64

options = cgi.FieldStorage()
response = {
    'url': options.getvalue('url'),
    'success': True,
    'data': ''
}

try:
    imageHandle = urllib.urlopen(response['url'])
except:
    response['success'] = False
    print 'Status: 404 Not Found'
else:
    response['data'] = base64.encodestring(imageHandle.read())
    print 'Status: 200 OK'
    print 'Content-Type: application/json'

print
print json.dumps(response);
