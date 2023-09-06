# QuickCert.js

## Installation

```sh
// Install Globally
npm install -g quickcert

// Install Locally - NPM
npm install quickcert

// Install Locally - YARN
yarn add quickcert
```

## Terms

### Key file
Keyfile is a file in which the private key is saved. Quickcert will search this keyfile (default: qcert.key) unless you provide custom key (by -k option)

### Config file
Config file is a file in which the public keys of each file reside - in other words, encrypted.
You can publicly save or publish this config file since there are any datas which are confidential. This encryption is executed by AES-256 (GCM Mode) Two-way cryptography and saved in base64 format.


## Usage

Use yarn or npx to execute it.

If you installed globally, execute like : <code>quickcert \<command></code>
Else locally, execute like : <code>yarn quickcert \<command></code>

Execute <code>quickcert help</code> for help.



### quickcert init

#### Description

Initialize configuration files. You must initialize before all of the commands.<br/>
Nothing hard, cli interface will pop out!

#### Parameters

- --cfg : custom configuration file root

### quickcert decrypt

#### Description

Decrypt credentials.

#### Parameters
- <filePath (positional)> [not required] : directory of credential. Could be one or more.
- -k : private key (password) of encrypted credentials
- --kf : custom keyfile root
- --cfg : custom configuration file root
#### Examples
<code>quickcert decrypt a.txt</code>
<code>quickcert decrypt a.txt b.key c.exe -k test</code>
### quickcert encrypt

#### Description

Register credentials to configuration file. <br/>
Of course, all the credentials will be encrypted, so don't be afraid of uploading the qcert.conf file to public!

#### Parameters

- <filePath (positional)> [required] : directory of credential. Could be one or more.
- -k : private key (password) of encrypted credentials
- --kf : custom keyfile root
- --cfg : custom configuration file root

#### Examples
<code>quickcert encrypt a.txt</code>
<code>quickcert encrypt a.txt b.key c.exe</code>



### quickcert renew

#### Description

Re-encrypts all the registered credentials.

#### Parameters

- -k : private key (password) of encrypted credentials
- --kf : custom keyfile root
- --cfg : custom configuration file root

### quickcert delete

#### Description

Unregister credentials from configuration.

#### Parameters

- <filePath (positional)> [required] : directory of credential.
- -k : private key (password) of encrypted credentials
- --kf : custom keyfile root
- --cfg : custom configuration file root

#### Example
<code>quickcert delete a.txt</code>

## Bug Report

Please report your bug in the issue tab!

## Prerequisites
Node.js environment higher than Node14 (tested on Node14, Node16, Node20 environment)