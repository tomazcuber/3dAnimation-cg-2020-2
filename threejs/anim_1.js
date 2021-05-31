function WaveAnimation() {}

Object.assign( WaveAnimation.prototype, {

    init: function() {
        let rightUpperArmTween = this.createTween(
            robot.getObjectByName("right_upper_arm"),
            0,
            (Math.PI/2),
            500,
            {x:- robotSizes.upper_arm_width /2, y: robotSizes.upper_arm_height / 2});

        // Here you may include animations for other parts 
        let headTween = this.createTween(
            robot.getObjectByName("head"),
            0,
            Math.PI/6,
            500,
            {x:0, y: - robotSizes.head_size});
        
        let leftLowerArmTween = this.createTween(
            robot.getObjectByName("left_lower_arm"),
            0,
            -Math.PI/8,
            500,
            {x:0, y: robotSizes.lower_arm_height /2});
        
        let leftHandTween = this.createTween(
            robot.getObjectByName("left_hand"),
            0,
            -Math.PI/6,
            500,
            {x:0, y: robotSizes.hand_height / 2});

        let rightLowerArmTween = this.createTween(
            robot.getObjectByName("right_lower_arm"),
            0,
            Math.PI/2,
            500,
            {x: 0, y: robotSizes.lower_arm_height});
        
        let rightHandUpTween = this.createTween(
            robot.getObjectByName("right_hand"),
            0,
            Math.PI/4,
            100,
            {x:0, y: robotSizes.hand_height / 2});
        
        let rightHandDownTween = this.createTween(
            robot.getObjectByName("right_hand"),
            Math.PI/4,
            0,
            100,
            {x:0, y: robotSizes.hand_height / 2});
        
        
        var lowerArmRepeatCount = 0;
        rightLowerArmTween.onRepeat(function(){
            lowerArmRepeatCount++;
            if(lowerArmRepeatCount % 2 == 1){
                rightHandUpTween.start();
            }
            else {
                rightHandDownTween.start();
            }
        });


        //  upperArmTween.chain( ... ); this allows other related Tween animations occur at the same time
        rightUpperArmTween.start().chain(rightLowerArmTween);
        headTween.start();

        leftLowerArmTween.start().chain(leftHandTween);
        rightLowerArmTween.easing(TWEEN.Easing.Quadratic.InOut).repeat(Infinity).yoyo(true);
       
    },
    
    createTween: function(bodyPart, startAngle=0, endAngle, duration, pivot){
        return new TWEEN.Tween({theta:startAngle}).to({theta:endAngle}, duration)
            .onUpdate(function(){
                bodyPart.matrix
                .makeTranslation(0,0,0)
                .premultiply(new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y,0))
                .premultiply(new THREE.Matrix4().makeRotationZ(this._object.theta))
                .premultiply(new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, 0))
                .premultiply(new THREE.Matrix4().makeTranslation(bodyPart.position.x, bodyPart.position.y, 0));       
                
                bodyPart.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene,camera);
            });
    },

    animate: function(time) {
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    },

    run: function() {
        this.init();
        this.animate(0);
    }
});




