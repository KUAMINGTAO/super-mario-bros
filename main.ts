namespace SpriteKind {
    export const COIN = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile6`, function (sprite, location) {
    game.setGameOverScoringType(game.ScoringType.HighScore)
    game.gameOver(true)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    JUMP += 1
    if (JUMP == 1) {
        if (MARIO.vy == 0) {
            MARIO.vy = -100
        }
    } else {
        if (MARIO.vy == 0) {
            MARIO.vy = -200
        }
    }
    if (JUMP == 3) {
        JUMP = 0
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    info.changeLifeBy(-1)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile8`, function (sprite, location) {
    if (controller.A.isPressed()) {
        for (let value of tiles.getTilesByType(assets.tile`myTile9`)) {
            M = sprites.create(img`
                ........4444........
                .......444422.......
                ......44442222......
                .....4444422222.....
                ....444444422244....
                ...44222444444444...
                ...42222244444444...
                ..4422222444442244..
                ..4422222444442224..
                ..4442224444444224..
                ..4444444444444444..
                ...42221111112224...
                ......11111111......
                ......11111141......
                ......11111141......
                .......111141.......
                `, SpriteKind.Food)
            tiles.placeOnTile(M, value)
            tiles.setTileAt(value, assets.tile`transparency16`)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile5`, function (sprite, location) {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.COIN, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    POWER_MARIO = 1
    animation.runImageAnimation(
    MARIO,
    [img`
        ......22222.....
        ....2222225.....
        ...22222255.....
        ...22222222222..
        ...eeeddeddd....
        ..eddeddeedddd..
        ..eddeedddddddd.
        .eeddeedddedddd.
        .eedddddeeeeee..
        .eeedddddeeeee..
        ...eedddddddd...
        ....8ddddde.....
        ....28222282....
        ...2282222822...
        ..222822228222..
        .22228222282222.
        .22288222288222.
        2222882222882222
        2222888888882222
        2222858888582222
        dddd88888888dddd
        dddd88888888dddd
        .ddd88888888ddd.
        .dd8888888888dd.
        ..888888888888..
        .88888888888888.
        .888888..888888.
        .888888..888888.
        ..eeeee..eeeee..
        ..eeeee..eeeee..
        eeeeeee..eeeeeee
        eeeeeee..eeeeeee
        `],
    500,
    false
    )
    sprites.destroy(otherSprite)
    info.changeLifeBy(1)
    pause(100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (controller.left.isPressed() || controller.right.isPressed()) {
        POWER_MARIO = 1
        animation.runImageAnimation(
        MARIO,
        [img`
            . . . . . . . 2 2 2 2 2 . . . . 
            . . . . . . 2 2 2 2 2 2 2 2 2 . 
            . . . . . . e e e d d f d . . . 
            . . . . . e d e d d d f d d d . 
            . . . . . e d e e d d d f d d d 
            . . . . . . e d d d d f f f f . 
            . . . . . . . d d d d d d d . . 
            . . . . . . 2 2 8 2 2 8 2 2 . . 
            . . . . . 2 2 2 8 2 2 8 2 2 2 . 
            . . . . 2 2 2 2 8 8 8 8 2 2 2 2 
            . . . . d d 2 8 5 8 8 5 8 2 d d 
            . . . . d d d 8 8 8 8 8 8 d d d 
            . . . . d d 8 8 8 8 8 8 8 8 d d 
            . . . . . . 8 8 8 . . 8 8 8 . . 
            . . . . . e e e . . . . e e e . 
            . . . . e e e e . . . . e e e e 
            `],
        500,
        false
        )
        info.changeLifeBy(-1)
        pause(500)
    } else {
        sprites.destroy(otherSprite)
        info.changeScoreBy(1)
    }
})
let M: Sprite = null
let JUMP = 0
let MEY: Sprite = null
let MUS_EY: Sprite = null
let myEnemy: Sprite = null
let M_ENEMY: Sprite = null
let POWER_MARIO = 0
let COIN: Sprite = null
let MARIO: Sprite = null
scene.setBackgroundColor(9)
MARIO = sprites.create(img`
    . . . . 2 2 2 2 2 2 . . . . . . 
    . . . 2 2 2 2 2 2 2 2 2 2 . . . 
    . . . e e e d d f d . . . . . . 
    . . e d e d d d f d d d . . . . 
    . . e d e e d d d f d d d . . . 
    . . . e d d d d f f f f . . . . 
    . . . . d d d d d d d d . . . . 
    . . . 2 2 8 2 2 8 2 . . . . . . 
    . . 2 2 2 8 2 2 8 2 2 2 . . . . 
    . 2 2 2 2 8 8 8 8 2 2 2 2 . . . 
    . d d 2 8 5 8 8 5 8 2 d d . . . 
    . d d d 8 8 8 8 8 8 d d d . . . 
    . d d 8 8 8 8 8 8 8 8 d d . . . 
    . . . 8 8 8 . . 8 8 8 . . . . . 
    . . e e e . . . . e e e . . . . 
    . e e e e . . . . e e e e . . . 
    `, SpriteKind.Player)
controller.player1.moveSprite(MARIO, 100, 0)
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(MARIO)
MARIO.ay = 200
MARIO.setPosition(10, 96)
for (let value of tiles.getTilesByType(assets.tile`myTile7`)) {
    COIN = sprites.create(img`
        . . . . . . 5 5 5 5 f f . . . . 
        . . . . . 5 5 5 5 5 5 f f . . . 
        . . . . . 5 5 4 4 5 5 f f . . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . . 5 5 f f 5 5 f f . . . 
        . . . . . 5 5 5 5 5 5 f f . . . 
        . . . . . . 5 5 5 5 f f . . . . 
        `, SpriteKind.COIN)
    tiles.placeOnTile(COIN, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
    animation.runImageAnimation(
    COIN,
    [img`
        . . . . . . 5 5 5 5 f f . . . . 
        . . . . . 5 5 5 5 5 5 f f . . . 
        . . . . . 5 5 4 4 5 5 f f . . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . 5 5 4 5 5 f 5 5 f f . . 
        . . . . . 5 5 f f 5 5 f f . . . 
        . . . . . 5 5 5 5 5 5 f f . . . 
        . . . . . . 5 5 5 5 f f . . . . 
        `,img`
        . . . . . . 4 4 4 4 f f . . . . 
        . . . . . 4 4 4 4 4 4 f f . . . 
        . . . . . 4 4 5 5 4 4 f f . . . 
        . . . . 4 4 5 4 4 f 4 4 f f . . 
        . . . . 4 4 5 4 4 f 4 4 f f . . 
        . . . . 4 4 5 4 4 f 4 4 f f . . 
        . . . . 4 4 5 4 4 f 4 4 f f . . 
        . . . . 4 4 5 4 4 f 4 4 f f . . 
        . . . . 4 4 5 4 4 f 4 4 f f . . 
        . . . . 4 4 5 4 4 f 4 4 f f . . 
        . . . . 4 4 5 4 4 f 4 4 f f . . 
        . . . . 4 4 5 4 4 f 4 4 f f . . 
        . . . . 4 4 5 4 4 f 4 4 f f . . 
        . . . . . 4 4 f f 4 4 f f . . . 
        . . . . . 4 4 4 4 4 4 f f . . . 
        . . . . . . 4 4 4 4 f f . . . . 
        `],
    100,
    true
    )
}
info.setLife(1)
POWER_MARIO = 0
for (let value of tiles.getTilesByType(assets.tile`myTile10`)) {
    M_ENEMY = sprites.create(img`
        . . . . . . e e e e . . . . . . 
        . . . . . e e e e e e . . . . . 
        . . . . e e e e e e e e . . . . 
        . . . e e e e e e e e e e . . . 
        . . e f f e e e e e e f f e . . 
        . e e e 1 f e e e e f 1 e e e . 
        . e e e 1 f e e e e f 1 e e e . 
        e e e e 1 f 1 e e 1 f 1 e e e e 
        e e e e 1 1 1 e e 1 1 1 e e e e 
        e e e e e e e e e e e e e e e e 
        . e e e e 1 1 1 1 1 1 e e e e . 
        . . . . 1 1 1 1 1 1 1 1 . . . . 
        . . f f 1 1 1 1 1 1 1 1 f f . . 
        . f f f f f 1 1 1 1 f f f f f . 
        . f f f f f f . . f f f f f f . 
        . . f f f f f . . f f f f f . . 
        `, SpriteKind.Enemy)
    tiles.placeOnTile(M_ENEMY, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
}
for (let value of tiles.getTilesByType(assets.tile`myTile11`)) {
    myEnemy = sprites.create(img`
        . . . . . . e e e e . . . . . . 
        . . . . . e e e e e e . . . . . 
        . . . . e e e e e e e e . . . . 
        . . . e e e e e e e e e e . . . 
        . . e f f e e e e e e f f e . . 
        . e e e 1 f e e e e f 1 e e e . 
        . e e e 1 f e e e e f 1 e e e . 
        e e e e 1 f 1 e e 1 f 1 e e e e 
        e e e e 1 1 1 e e 1 1 1 e e e e 
        e e e e e e e e e e e e e e e e 
        . e e e e 1 1 1 1 1 1 e e e e . 
        . . . . 1 1 1 1 1 1 1 1 . . . . 
        . . f f 1 1 1 1 1 1 1 1 f f . . 
        . f f f f f 1 1 1 1 f f f f f . 
        . f f f f f f . . f f f f f f . 
        . . f f f f f . . f f f f f . . 
        `, SpriteKind.Enemy)
    tiles.placeOnTile(myEnemy, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
}
for (let value of tiles.getTilesByType(assets.tile`myTile12`)) {
    MUS_EY = sprites.create(img`
        . . . . . . e e e e . . . . . . 
        . . . . . e e e e e e . . . . . 
        . . . . e e e e e e e e . . . . 
        . . . e e e e e e e e e e . . . 
        . . e f f e e e e e e f f e . . 
        . e e e 1 f e e e e f 1 e e e . 
        . e e e 1 f e e e e f 1 e e e . 
        e e e e 1 f 1 e e 1 f 1 e e e e 
        e e e e 1 1 1 e e 1 1 1 e e e e 
        e e e e e e e e e e e e e e e e 
        . e e e e 1 1 1 1 1 1 e e e e . 
        . . . . 1 1 1 1 1 1 1 1 . . . . 
        . . f f 1 1 1 1 1 1 1 1 f f . . 
        . f f f f f 1 1 1 1 f f f f f . 
        . f f f f f f . . f f f f f f . 
        . . f f f f f . . f f f f f . . 
        `, SpriteKind.Enemy)
    tiles.placeOnTile(MUS_EY, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
}
for (let value of tiles.getTilesByType(assets.tile`myTile13`)) {
    MEY = sprites.create(img`
        . . . . . . e e e e . . . . . . 
        . . . . . e e e e e e . . . . . 
        . . . . e e e e e e e e . . . . 
        . . . e e e e e e e e e e . . . 
        . . e f f e e e e e e f f e . . 
        . e e e 1 f e e e e f 1 e e e . 
        . e e e 1 f e e e e f 1 e e e . 
        e e e e 1 f 1 e e 1 f 1 e e e e 
        e e e e 1 1 1 e e 1 1 1 e e e e 
        e e e e e e e e e e e e e e e e 
        . e e e e 1 1 1 1 1 1 e e e e . 
        . . . . 1 1 1 1 1 1 1 1 . . . . 
        . . f f 1 1 1 1 1 1 1 1 f f . . 
        . f f f f f 1 1 1 1 f f f f f . 
        . f f f f f f . . f f f f f f . 
        . . f f f f f . . f f f f f . . 
        `, SpriteKind.Enemy)
    tiles.placeOnTile(MEY, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
}
forever(function () {
    for (let index = 0; index < 70; index++) {
        M_ENEMY.x += -1
        pause(100)
    }
    pause(100)
    for (let index = 0; index < 70; index++) {
        M_ENEMY.x += 1
        pause(100)
    }
})
forever(function () {
    for (let index = 0; index < 70; index++) {
        myEnemy.x += -1
        pause(100)
    }
    pause(100)
    for (let index = 0; index < 70; index++) {
        myEnemy.x += 1
        pause(100)
    }
})
forever(function () {
    for (let index = 0; index < 100; index++) {
        MUS_EY.x += -1
        pause(100)
    }
    pause(100)
    for (let index = 0; index < 100; index++) {
        MUS_EY.x += 1
        pause(100)
    }
})
forever(function () {
    for (let index = 0; index < 100; index++) {
        MEY.x += -1
        pause(100)
    }
    pause(100)
    for (let index = 0; index < 100; index++) {
        MEY.x += 1
        pause(100)
    }
})
