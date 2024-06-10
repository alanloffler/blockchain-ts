import { createHash } from "crypto";

const DIFFICULTY: number = 3;
const MINE_RATE: number = 3000;

export class Block {
    private time: number;
    private previousHash: string;
    private hash: string;
    private data: string;
    private nonce: number;
    private difficulty: number;

    constructor(
        time: number,
        previousHash: string,
        hash: string,
        data: string,
        nonce: number,
        difficulty: number
    ) {
        this.time = time;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static get genesis(): Block {
        const time = new Date("2009-03-01").getTime();
        
        return new this(
            time,
            "",
            "genesis-hash",
            "Genesis Block",
            0,
            DIFFICULTY
        );
    }

    public static mine(previousBlock: Block, data: string): Block {
        const { hash: previousHash } = previousBlock;
        let { difficulty } = previousBlock;
        let hash: string;
        let time: number;
        let nonce: number = 0;

        do {
            time = Date.now();
            nonce++;
            difficulty =
                previousBlock.time + MINE_RATE > time
                    ? previousBlock.difficulty + 1
                    : previousBlock.difficulty - 1;
            hash = createHash("sha256")
                .update(previousHash + time + data + nonce + difficulty)
                .digest("hex");
        } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

        return new this(time, previousHash, hash, data, nonce, difficulty);
    }

    public toString(): string {
        return `Block
        Time: ${this.time}
        PreviousHash: ${this.previousHash}
        Hash: ${this.hash}
        Data: ${this.data}
        Nonce: ${this.nonce}
        Difficulty: ${this.difficulty}
        ----------------------------------------------------------------------------------------`;
    }
}
