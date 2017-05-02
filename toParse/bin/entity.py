URI = 'https://maps.googleapis.com/'
URN = 'maps/api/geocode/'
PARAM = 'json?address={}&key='
# used
API_KEY = 'AIzaSyCnmVQDhqDPAnmF60uk9q8h7DTL7y2YNw8'
# used
# API_KEY = 'AIzaSyC8PiqSGpzpUf-G4BtmCBGX_vrRmeBXJIM'
# # clear
# API_KEY_6 = 'AIzaSyDO7CPTSh9edVOM52YP7RtdoKSkzwRUxPE'
# # clear
# API_KEY_7 = 'AIzaSyA1XeufpoQeDIEUDGoDq-eQROk0YhNxJ8U'
# # clear
# API_KEY_8 = 'AIzaSyBykHnYJiANsGulRUwlz54dbr-ccuUL-yc'
# # clear
# API_KEY_9 = 'AIzaSyCxLFBkABmWaRQVhKZcimJV2fcYepoAUcg'
# # clear
# API_KEY = 'AIzaSyDKdpEcVLb_N0Yn1jXOsmDSIyoLPaRImEA'
# # clear
# API_KEY = 'AIzaSyC0BPVdtVTiE1_NM87zQw-v0jGLcZikM7U'


class LineRecord:
    def __init__(self, ident, body):
        self.id = ident
        self.line = self._parse_body(body)
        self.is_done = False
        self.completed_line = ''
        self.response_status = ''
        self.zip_code = self._get_zip_code(body)
        self.url = self.do_urls(body)

    def _get_zip_code(self, body):
        line = self._parse_body(body)
        l = line.split(';')

        return int(l[3])

    def _parse_body(self, body):
        return body.replace(' ', '')[:-1]

    def do_urls(self, body):
        line = self._parse_body(body)
        l = line.split(';')
        url_tmpl = URI + URN + PARAM + API_KEY
        url = url_tmpl.format('{},{},{},{}'.format(l[0], l[1], l[2], l[4]))

        return url

    def __eq__(self, other):
        return isinstance(other, LineRecord) and self.zip_code == other.zip_code

    def __hash__(self):
        return hash(self.zip_code)