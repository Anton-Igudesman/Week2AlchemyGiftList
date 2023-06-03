const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const verifyProof = require('../utils/verifyProof.js');

const serverUrl = 'http://localhost:1225';
//proof, leaf, root
const merkleTree = new MerkleTree(niceList);

const root = merkleTree.getRoot();

const index = function nameIndex(name) {
  return niceList.findIndex(listname => listname === name);
}

const name = 'Jean Cronas';

const proof = merkleTree.getProof(index(name));

const present = 'Remote Control Surfboard';



async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    leaf: name,
    root,
    present
    
  });

  console.log({ gift });
}

main();