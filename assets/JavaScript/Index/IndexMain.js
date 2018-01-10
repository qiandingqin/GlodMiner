// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        Lighting:{
            type : cc.Node,
            default : null
        },
        BGM : {
            default : null,
            url : cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //关闭FPS面板
        cc.director.setDisplayStats(false);

        //播放洞内灯光
        let action = cc.sequence(
            cc.fadeTo(1,0),
            cc.fadeTo(1,255)
        ).repeatForever();

        this.Lighting.runAction(action);

        //监听开始游戏
        let startBtn = cc.find('Canvas/BtnBackground/Start');

        startBtn.on(cc.Node.EventType.TOUCH_END,this.StartGame.bind(this));

        this.BGM_ID = cc.audioEngine.play(this.BGM);

        //预加载场景2
        cc.director.preloadScene('Game');
    },

    StartGame(){
        //关闭BGM
        cc.audioEngine.stop(this.BGM_ID);
        //清空关卡数
        cc.sys.localStorage.removeItem('level');
        //跳转场景
        cc.director.loadScene("Game");
    },

    // start () {

    // },

    // update (dt) {},
});
