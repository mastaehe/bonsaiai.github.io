# Latest Versions

This is a list of Bonsai's currently supported versions of its software packages. All dates in YEAR.MONTH.DAY format.

| Software               | Package Name | Versions | Last Updated |
| -                      | -            | -        | -            |
| Command Line Interface | bonsai-cli   | 0.8.29   | 2018.10.08   |
| Gym Common             | bonsai-gym   | 2.0.9    | 2018.09.24   |
| Python Library         | bonsai-ai    | 2.0.14   | 2018.10.08   |
| C++ Library            | libbonsai    | 2.0.6    | 2018.10.08   |

# Product Release Notes

These release notes combine releases for the web (BRAIN Dashboard), the backend services (Bonsai AI Engine), the Inkling language, and Bonsai's API. All releases are tagged by date for the web, backend, Inkling, and API. SDK and CLI are released separately and have different version numbers. They are available on GitHub.

Release Notes for CLI: <https://github.com/BonsaiAI/bonsai-cli/blob/master/bonsaicli/CHANGELOG.md>

Release Notes for Python SDK (bonsai-ai and bonsai-gym libraries): <https://github.com/BonsaiAI/bonsai-sdk/blob/master/bonsai-ai/CHANGELOG.md>

Release Notes for C++ SDK (libbonsai): <https://github.com/BonsaiAI/libbonsai/blob/master/libbonsai/CHANGELOG.md>

### 2018.09.25

Notable features:

* Admin interface for product account management

Various bug fixes, including:

* Increased backend CPU resources
* Other various backend stability improvements
* Fixed a crashing issue with Lundar Lander

### 2018.09.04

Notable features:

* You may now start/stop training from the web for all simulator types
* The cartpole demo BRAIN has been updated to use better machine teaching
* Added logger and logging to the CLI

Various bug fixes, including:

* Improved error reporting for bonsai create/delete
* Improved handling of output constraints for TRPO
* Fixed a bug with TRPO missing data for action in notify_state
* Fixed source of some 500 server and 400 client errors

### 2018.08.15

Notable features:

* A new example of using Predictor class with Cartpole is available

Various bug fixes, including: 

* Improved error reporting for bonsai delete, train resume, and train stop
* bonsai switch --show will now show output for DEFAULT profile
* Improved stability of backend services

### 2018.08.08

Notable features:

* There is now a tooltip on the sim graph tab of the BRAIN Details page
* The starter BRAIN template now uses SDK2

Various bug fixes, including: 

* Capacity and stability improvements on beta / gamma2
* Fix for Docker ingress networking
* Issue with TRPO and Luminance fixed

### 2018.08.02

Various bug fixes, including: 

* The TRPO algorithm now works with Luminance
* Fixed websocket disconnect issues
* You can now scroll up/down on the page after creating an access key
* Fixed client 503/504 errors in CLI
* Fixed issue with an internal server error appearing after creating a new account on beta
* Reset password emails were not being delivered for a short time, this has been fixed

### 2018.07.03

Various bug fixes and internal stability improvements.

### 2018.06.22

Various bug fixes, including: 

* Stability improvements for simulations when training a BRAIN

More security enhancements were included in this release.

### 2018.06.14

Notable features:

* Updated Access Keys to be single use for security purposes
* Your username is now required for `bonsai configure`

Various bug fixes, including:

* An incorrect `is` clause in Inkling was being silently ignored, rather than causing a compile-time error
* Using `Estimator` vs. `estimator` in Inkling will no longer cause silent failure

A variety of security updates were also included in this release.

### 2018.05.22

Notable features:

* Proxy Support for Bonsai CLI

Various bug fixes, including:

* Fix so that OpenAI Gym's Taxi simulator runs correctly with bonsai-ai
* Fixed a segfault happening when accessing `Simulator::record_file()` if no record file had been set
* The install instructions for bonsai-ai now work on Windows!
* There is now a friendly error when you try to upload more than one Inkling file to a BRAIN
* You will not longer get an error when you try `bonsai sims list` before training starts

### 2018.05.01

Notable features:

* You can now specify an algorithm and its parameters for the AI Engine to use
* Support for Unity as a simulator
* Added statistics to simulators and the option for the SDK to log them for easy analysis
* Simulink demo added to the Create BRAIN web page
* bonsai-simulink is now supported on Windows 10
* EnergyPlus demo has been upgraded to use SDK2
* Constants are supported in Inkling

Various bug fixes, including:

* Bonsai CLI commends no longer wait forever
* Training graph no longer disappears sometimes
* Fixed access key link in bonsai configure command
* Simulator tab no longer resets every time you click away
* Fix for SDK2 port of Taxi simulator

Other notes:

* Limited BRAINs actively training to 2
* Increase of supported parallel simulators from 256 to 1024

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

# Open Source Attribution

The Bonsai Platform and associated tools utilize open source code. We thank the authors of these libraries on our [Open Source Attribution](./open-source.html) page.