.PHONY: clean

all:
	electron-packager . SaavnMac --platform=darwin --arch=x64 --icon=logo.icns --out=build --overwrite

clean:
	rm -rf build/SaavnMac-darwin-x64
