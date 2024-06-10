import { Block } from "./block";

export class Blockchain {
    private chain: Block[];

    constructor() {
        this.chain = [Block.genesis];
    }

    public addBlock(data: string): Block {
        const previousBlock = this.chain[this.chain.length - 1];
        const block = Block.mine(previousBlock, data);

        this.chain.push(block);

        return block;
    }
}
