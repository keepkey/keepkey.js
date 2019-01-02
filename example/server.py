# taken from http://www.piware.de/2011/01/creating-an-https-server-in-python/
# generate server.xml with the following command:
#    openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes
# run as follows:
#    python simple-https-server.py
# then in your browser, visit:
#    https://localhost:4443

from http.server import HTTPServer
from http.server import SimpleHTTPRequestHandler
import ssl
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
cert_path = dir_path + '/ssl/server.pem'

httpd = HTTPServer(('localhost', 8888), SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(httpd.socket, certfile=cert_path, server_side=True)
httpd.serve_forever()
