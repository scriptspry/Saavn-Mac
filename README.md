# Saavn Mac

Based on Electron, built for Mac OS.

Download, and other info - [scriptspry.com/2016/07/30/saavn-mac-app.html](http://scriptspry.com/2016/07/30/saavn-mac-app.html).

## Development

Run `npm run` to see all commands defined in `package.json`.

#### Build Locally
```
npm run clean
npm run pack
```

#### Install Locally
Copies compiled binary to `/Applications`
```
npm run install
```

#### Push to S3
Copies compressed binary to s3. Requires 7zip. Run `brew install p7zip` for the command line version.

```
npm run compress
npm run publish
```

# License

The MIT License (MIT)

Copyright (c) 2016 scriptspry

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


