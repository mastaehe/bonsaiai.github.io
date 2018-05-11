# Latest Versions

This is a list of Bonsai's currently supported versions of its software packages. All dates in YEAR.MONTH.DAY format.

| Software               | Package Name | Versions | Last Updated |
| -                      | -            | -        | -            |
| Command Line Interface | bonsai-cli   | 0.8.23   | 2018.05.07   |
| Python Library         | bonsai-ai    | 2.0.6    | 2018.05.07   |
| Gym Common             | bonsai-gym   | 2.0.4    | 2018.05.07   |

# Product Release Notes

These release notes combine releases for the web (BRAIN Dashboard), the backend services (Bonsai AI Engine), the Inkling language, and Bonsai's API. All releases are tagged by date for the web, backend, Inkling, and API. SDK and CLI are released separately and have different version numbers. They are available on GitHub.

Release Notes for CLI: [https://github.com/BonsaiAI/bonsai-cli/blob/master/CHANGELOG.md]()

Release Notes for Python SDK (bonsai-ai, bonsai-cli, and bonsai-gym libraries): [https://github.com/BonsaiAI/bonsai-sdk/blob/master/bonsai-ai/CHANGELOG.md]()

### 2018.03.07

Various bug fixes, including:

* Fixes for resume training

### 2018.02.23

Various bug fixes, including:

* Removed limitation for Inkling variables ending in underscore followed by a number
* Fixed backend race conditions causing dropped simulators

### 2018.02.13

Notable features:

* You can now Resume Training a BRAIN or Restart Training instead

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

