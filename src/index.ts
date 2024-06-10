import { Block } from "./block";
import { Blockchain } from "./blockchain";

const blockchain: Blockchain = new Blockchain();

for (let i: number = 0; i < 10; i++) {
    const block: Block = blockchain.addBlock(`Block data: ${i}`);
    console.log(block.toString());
}
