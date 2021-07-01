# quickcert.js

## Usage

Use yarn or npx to execute it.

Install and execute <code>yarn quickcert.js help</code>, then all of the commands will pop out.

### yarn quickcert.js init

#### Description

Initialize configuration files. You must initialize before all of the commands.<br/>
Nothing hard, cli interface will pop out!

#### Parameters

- -cfg : custom configuration file root

### yarn quickcert.js decrypt

#### Description

Decrypt credentials.

#### Parameters

- -k : private key (password) of encrypted credentials
- -f : custom keyfile root
- -cfg : custom configuration file root

### yarn quickcert.js register

#### Description

Register credentials to configuration file. <br/>
Of course, all the credentials will be encrypted, so don't be afraid of uploading the qcert.conf file to public!

#### Parameters

- -d [required] : directory of credential.
- -k : private key (password) of encrypted credentials
- -f : custom keyfile root
- -cfg : custom configuration file root

### yarn quickcert.js encrypt (not recommended)

#### Not your business XD
