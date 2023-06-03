const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {
    proof,
    leaf,
    root,
    present
  } = req.body;
  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(proof, leaf, root);
  if(isInTheList) {
    res.send(`Wow! ${leaf} You got a ${present}!`);
  }
  else {
    res.send(`${leaf} You should've behaved a little better! If you were on the nice list you would've gotten a ${present} :(`);
  }
  // const lickentoe = 'please be my mommy!!'
  // res.send(lickentoe)
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
