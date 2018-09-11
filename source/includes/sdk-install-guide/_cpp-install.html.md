# Install libbonsai for C++

```powershell
# Build VCPKG
cd C:\
git clone https://github.com/BonsaiAI/vcpkg.git
cd vcpkg
.\bootstrap-vcpkg.bat
.\vcpkg.exe integrate install
```

```powershell
# Build/Install libbonsai (incl dependencies):
.\vcpkg.exe install bonsai:x64-windows-bns
```

```shell--macos
$ brew install BonsaiAI/homebrew-bonsai/bonsai
```

```shell--ubuntu
# Add url of libbonsai apt-repo to sources.list
$ echo "deb [trusted=yes] https://libbonsai-debian.s3.amazonaws.com xenial main" >> /etc/apt/sources.list
$ echo "deb-src [trusted=yes] https://libbonsai-debian.s3.amazonaws.com xenial main" >> /etc/apt/sources.list

# Update package lists
$ apt-get update

# Install libbonsai
$ apt-get install libbonsai

# Get source
$ apt-get source libbonsai
```

The C++ library `libbonsai` can currently be installed via VCPKG on Windows, via Homebrew on macOS, or via APT on Ubuntu.

The VCPKG is hosted on BonsaiAI's GitHub and must be cloned before you can build and install `libbonsai`.

The Homebrew formula is hosted on BonsaiAI's GitHub, therefore the full link to the formula must be specified when using `brew` while it is in beta.

The APT package is in an apt-repo which is hosted on Amazon S3. The url of the apt-repo must be added to your `sources.list` before using `apt-get`.

See the [C++ Library Reference][1] for full details on usage of this library.

[1]: ../references/library-reference.html?cpp