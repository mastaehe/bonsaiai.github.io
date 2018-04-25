# Product Release Notes

These release notes combine releases for the web (BRAIN Dashboard), the backend services (Bonsai AI Engine), and Bonsai's API. All releases are tagged by date for the web, backend, and API. Releases are based on version for the SDKs and CLI which are available on GitHub.

Release Notes for CLI: [https://github.com/BonsaiAI/bonsai-cli/blob/master/CHANGELOG.md]()

Release Notes for Python SDK (bonsai-ai): [https://github.com/BonsaiAI/bonsai-sdk/blob/master/bonsai-ai/CHANGELOG.md]()

### 2018.02.23

Various bug fixes, including:

* Fix for concept threshold termination tags not terminating as expected
* Removed limitation for Inkling variables ending in underscore followed by a number
* Fixed backend race conditions causing dropped simulators

### 2018.02.13

Notable features:

* You can now Resume Training a BRAIN or Restart Training instead
* Tags for reward and iteration based termination of concepts

Various bug fixes, including:

* Fixed action scaling in prediction episodes being different than training episodes
* Fix for the iteration and exploration rate update for resume training

### 2018.02.08

Notable features:

* Python SDK2 simulators can now run hosted on the web
* Resource limits have now been added to containers

Various bug fixes, including:

* Fixed IE11 visual display issues
* Fixed color caching issue requiring hard restart

### 2018.02.02

Notable features:

* Support of IE11 (Windows 7 and Windows 10)
* Python SDK2 standalone support (not linked against C++ binaries)
* Beta CPU and GPU node capacity has been tripled

Various bug fixes, including:

* Some BRAINs in Training were listed as Not Started while in Progress
* Fixed bonsai-ai not working for Python 3.5 on OSX
* Fix for IE11 not displaying access keys

### 2018.01.23

Notable features:

* New color scheme for BRAIN web graphs

Various bug fixes, including:

* Fix for IE11 BRAIN Dashboard
* Fixed occasional application error when trying to stop BRAIN training

### 2018.01.18

Notable features:

* BRAINs on beta are now private

Various bug fixes, including:

* Connecting a simulator for prediction will no longer alter the BRAIN's status
* Fixed issue where training graph would overlap older and newer training sessions
* Fix for bonsai push command not correctly uploading files to beta portal

