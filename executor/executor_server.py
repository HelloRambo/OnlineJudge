import json

from flask import Flask
from flask import jsonify
from flask import request

import executor_utils



app = Flask(__name__)


@app.route("/build_and_run", methods=["POST"])
def build_and_run():
    print "Got called: %s" % (request.data)
    data = json.loads(request.data)

    if 'code' not in data or 'lang' not in data:
        return "You should provide botb 'code' and 'lang'"
    code = data['code']
    lang = data['lang']

    print "API got called with code: %s in %s" % (code, lang)

    result = executor_utils.build_and_run(code, lang)

    return jsonify(result)


if __name__ == "__main__":
    executor_utils.load_image()
    app.run(debug=True)



