interface Enemy {
    x?: number,
    y?: number,
    width?: number,
    height?: number
}

interface Player {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    score?: number,
    nickname?: string
}

interface PlayerCollection {
    players?: {
        [key: string]: Player
    }
}

export {
    Enemy,
    Player,
    PlayerCollection
}