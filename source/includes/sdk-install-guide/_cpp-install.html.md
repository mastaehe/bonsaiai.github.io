# Install libbonsai for C++

<aside class="warning">
The C++ library is still in beta and currently only available on macOS and Ubuntu 16.04.
</aside>

```powershell
# Currently unavailable on Windows
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

The C++ library `libbonsai` can currently be installed via Homebrew on macOS or via APT on Ubuntu. 

The Homebrew formula is hosted on BonsaiAI's GitHub, therefore the full link to the formula must be specified when using `brew` while it is in beta.

The APT package is in an apt-repo which is hosted on Amazon S3. The url of the apt-repo must be added to your `sources.list` before using `apt-get`.

See the [C++ Library Reference][1] for full details on usage of this library.

[1]: ../references/library-reference.html?cpp