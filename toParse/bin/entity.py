URI = 'https://maps.googleapis.com/'
URN = 'maps/api/geocode/'
PARAM = 'json?address={}&key='
# used
API_KEY = [
    'AIzaSyCnmVQDhqDPAnmF60uk9q8h7DTL7y2YNw8',
    'AIzaSyC8PiqSGpzpUf-G4BtmCBGX_vrRmeBXJIM',
    'AIzaSyDO7CPTSh9edVOM52YP7RtdoKSkzwRUxPE',
    'AIzaSyCnmVQDhqDPAnmF60uk9q8h7DTL7y2YNw8', # repeat
    'AIzaSyC8PiqSGpzpUf-G4BtmCBGX_vrRmeBXJIM',
    'AIzaSyDO7CPTSh9edVOM52YP7RtdoKSkzwRUxPE',
    'AIzaSyA1XeufpoQeDIEUDGoDq-eQROk0YhNxJ8U', # unique
    'AIzaSyBykHnYJiANsGulRUwlz54dbr-ccuUL-yc',
    'AIzaSyCxLFBkABmWaRQVhKZcimJV2fcYepoAUcg',
    'AIzaSyDKdpEcVLb_N0Yn1jXOsmDSIyoLPaRImEA',
    'AIzaSyC0BPVdtVTiE1_NM87zQw-v0jGLcZikM7U'
]


class LineRecord:
    def __init__(self, ident, body, part):
        self.id = ident
        self.line = self._parse_body(body)
        self.is_done = False
        self.part = part
        self.completed_line = ''
        self.response_status = ''
        self.zip_code = self._get_zip_code(body)
        self.url = self.do_urls(body)

    def _get_zip_code(self, body):
        line = self._parse_body(body)
        l = line.split(';')

        return int(l[3])

    def _parse_body(self, body):
        return body[:-1]

    def do_urls(self, body):
        line = self._parse_body(body)
        l = line.split(';')
        url_tmpl = URI + URN + PARAM + API_KEY[self.part-1]
        url = url_tmpl.format('{},{},{},{}'.format(l[0], l[1], l[2], l[4]))

        return url

    def __eq__(self, other):
        return isinstance(other, LineRecord) and self.zip_code == other.zip_code

    def __hash__(self):
        return hash(self.zip_code)
