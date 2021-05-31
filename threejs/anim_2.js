function SailorMoonAnimation() {}

Object.assign( SailorMoonAnimation.prototype, {

    init: function() {
        let firstHeadTween = new TWEEN.Tween({pos_y: robotPositions.head[1], pos_z: robotPositions.head[2]}).to({pos_y:robotPositions.head[1] - 0.5, pos_z: -1}, 500)
        .onUpdate(function(){
            let head = robot.getObjectByName("head");
            head.matrix
            .makeTranslation(0,this._object.pos_y,0);

            head.updateMatrixWorld(true);
            stats.update();
            renderer.render(scene,camera);
        });
        
        let firstLeftUpperArmTween = this.createTween(
            robot.getObjectByName("left_upper_arm"),
            0,
            -2 * Math.PI / 3,
            500,
            {x:  robotSizes.upper_arm_width / 2, y: robotSizes.upper_arm_height /2}
        );

        let firstLeftLowerArmTween = this.createTween(
            robot.getObjectByName("left_lower_arm"),
            0,
            - 0.55 * Math.PI,
            500,
            {x: 0, y: robotSizes.lower_arm_height}
        );

        let rightHandTween = new TWEEN.Tween({theta:0}).to({theta:-Math.PI/6}, 500)
        .onUpdate(function(){
            pivot = {x: -robotSizes.hand_width/2, y: robotSizes.hand_height/2};
            left_hand = robot.getObjectByName("left_hand")
            left_hand.matrix
            .makeTranslation(0,0.2,0)
            .premultiply(new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y,0.5))
            .premultiply(new THREE.Matrix4().makeRotationZ(this._object.theta))
            .premultiply(new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, 0))
            .premultiply(new THREE.Matrix4().makeTranslation(left_hand.position.x, left_hand.position.y, 0));       
            
            left_hand.updateMatrixWorld(true);
            stats.update();
            renderer.render(scene,camera);
        });
     
        let rightUpperArmTween = this.createTween(
            robot.getObjectByName("right_upper_arm"),
            0,
            Math.PI/4,
            500,
            {x:- robotSizes.upper_arm_width /2, y: robotSizes.upper_arm_height / 2}
        );

        let rightLowerArmTween = this.createTween(
            robot.getObjectByName("right_lower_arm"),
            0,
            -Math.PI/2,
            500,
            {x: 0, y: robotSizes.lower_arm_height}
        )

        let firstLeftLegTween = this.createTween(
            robot.getObjectByName("left_upper_leg"),
            0,
            Math.PI * 0.02,
            500,
            {x:robotSizes.upper_leg_width/2, y: robotSizes.upper_leg_height/2}
        )

        let secondLeftLegTween = this.createTween(
            robot.getObjectByName("left_upper_leg"),
            Math.PI * 0.02,
            -((Math.PI / 6) - (Math.PI * 0.02)),
            500,
            {x:0, y: robotSizes.upper_leg_height/2}
        );

        let leftFootTween = this.createTween(
            robot.getObjectByName("left_foot"),
            0,
            (Math.PI/6),
            100,
            {x : robotSizes.foot_width/4, y:0}
        );

        let firstRightLegTween = this.createTween(
            robot.getObjectByName("right_upper_leg"),
            0,
            -Math.PI * 0.02,
            500,
            {x:-robotSizes.upper_leg_width/2, y: robotSizes.upper_leg_height/2}
        );

        let secondRightLegTween = this.createTween(
            robot.getObjectByName("right_upper_leg"),
            Math.PI * 0.02,
            ((Math.PI /6) - (Math.PI * 0.02)),
            500,
            {x:0, y: robotSizes.upper_leg_height/2}
        );

        let rightFootTween = this.createTween(
            robot.getObjectByName("right_foot"),
            0,
            -(Math.PI/12),
            100,
            {x : robotSizes.foot_width/4, y:0}
        )



        //jumpTween.start();
        
        firstHeadTween.start();
        secondLeftLegTween.easing(TWEEN.Easing.Exponential.Out);
        firstLeftLegTween.start().chain(secondLeftLegTween, leftFootTween);
        secondRightLegTween.easing(TWEEN.Easing.Exponential.Out);
        firstRightLegTween.start().chain(secondRightLegTween, rightFootTween);
        firstLeftLowerArmTween.easing(TWEEN.Easing.Exponential.Out);
        firstLeftUpperArmTween.start().chain(firstLeftLowerArmTween, rightHandTween);
        rightLowerArmTween.easing(TWEEN.Easing.Exponential.Out)
        rightUpperArmTween.start().chain(rightLowerArmTween);
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






