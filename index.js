#!/usr/bin/env node

const program = require('commander');
const wsse = require('wsse');
const ncp = require("copy-paste");

program
    .name('wsse-generator')
    .version('1.0.0')
    .option('-u, --username <username>', 'Username for WSSE Authentication')
    .option('-p, --password <password>', 'Password for WSSE Authentication')
    .parse(process.argv);

if (!program.username || !program.password) {
    program.outputHelp();
    process.exit(1);
}

let token = wsse({ username: program.username, password: program.password });
let wsseHeader = token.getWSSEHeader({ nonceBase64: true })

ncp.copy(wsseHeader);

console.log(`X-WSSE: ${wsseHeader}`);
console.log(`X-WSSE Header has been copied to clipboard`);