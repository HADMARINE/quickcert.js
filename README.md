# quickcert.js

## Installation

```sh
// Install Globally
npm install -g quickcert

//Install Locally
npm install quickcert
```

## Usage

Use yarn or npx to execute it.

If you installed globally, execute like : <code>quickcert <command></code>
Else locally, execute like : <code>yarn quickcert <command></code>

Execute <code>quickcert help</code> for help.

### quickcert init

#### Description

Initialize configuration files. You must initialize before all of the commands.<br/>
Nothing hard, cli interface will pop out!

#### Parameters

- -cfg : custom configuration file root

### quickcert decrypt

#### Description

Decrypt credentials.

#### Parameters

- -k : private key (password) of encrypted credentials
- -f : custom keyfile root
- -cfg : custom configuration file root

### quickcert encrypt <filePath>

#### Description

Register credentials to configuration file. <br/>
Of course, all the credentials will be encrypted, so don't be afraid of uploading the qcert.conf file to public!

#### Parameters

- <filePath (positional)> [required] : directory of credential.
- -k : private key (password) of encrypted credentials
- -f : custom keyfile root
- -cfg : custom configuration file root

### quickcert renewal

#### Description

Re-encrypts all the registered credentials.

#### Parameters

- -k : private key (password) of encrypted credentials
- -f : custom keyfile root
- -cfg : custom configuration file root

### quickcert delete <filePath>

#### Description

Unregister credentials from configuration.

#### Parameters

- <filePath (positional)> [required] : directory of credential.
- -k : private key (password) of encrypted credentials
- -f : custom keyfile root
- -cfg : custom configuration file root

## Bug Report

Please report your bug in the issue tab!
