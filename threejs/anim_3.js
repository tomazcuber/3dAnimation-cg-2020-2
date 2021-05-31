function BestMatesAnimation() {}

Object.assign(BestMatesAnimation.prototype, {
    init: function(){
        let leftUpperArmHorizontalTween = this.createTween(
            robot.getObjectByName("left_upper_arm"),
            0,
            -Math.PI * 0.4,
            500,
            {x:robotSizes.upper_arm_width /2, y: robotSizes.upper_arm_height / 2}
        );

        let rightUpperArmHorizontalTween = this.createTween(
            robot.getObjectByName("right_upper_arm"),
            0,
            (Math.PI * 0.4),
            500,
            {x:- robotSizes.upper_arm_width /2, y: robotSizes.upper_arm_height / 2}
        );

        let leftLowerArmLoop = this.createTween(
            robot.getObjectByName("left_lower_arm"),
            Math.PI * 0.1,
            Math.PI / 2,
            500
            ,{x:0, y: robotSizes.lower_arm_height}
        );
        let rightLowerArmLoop = this.createTween(
            robot.getObjectByName("right_lower_arm"),
            -Math.PI * 0.1,
            -Math.PI / 2,
            500
            ,{x:0, y: robotSizes.lower_arm_height}
        );

        let rightUpperLegUpLoop = this.createTween(            
            robot.getObjectByName("right_upper_leg"),
            0,
            (Math.PI /4),
            500,
            {x:0, y: robotSizes.upper_leg_height/2}
        );

        let rightLowerLegUpLoop = this.createTween(
            robot.getObjectByName("right_lower_leg"),
            0,
            -Math.PI / 6,
            500,
            {x:0, y: robotSizes.lower_leg_height}
        );

        let rightUpperLegDownLoop = this.createTween(
            robot.getObjectByName("right_upper_leg"),
            (Math.PI /4),
            0,
            500,
            {x:0, y: robotSizes.upper_leg_height/2}
        );

        let rightLowerLegDownLoop = this.createTween(
            robot.getObjectByName("right_lower_leg"),
            -Math.PI / 4,
            0,
            500,
            {x:0, y: robotSizes.lower_leg_height}
        );

        let leftUpperLegUpLoop = this.createTween(            
            robot.getObjectByName("left_upper_leg"),
            0,
            -(Math.PI /4),
            500,
            {x:0, y: robotSizes.upper_leg_height/2}
        );

        let leftUpperLegDownLoop = this.createTween(
            robot.getObjectByName("left_upper_leg"),
            -(Math.PI /4),
            0,
            500,
            {x:0, y: robotSizes.upper_leg_height/2}
        );

        //TODO: Implementar animação inferior das pernas 

   
        leftUpperArmHorizontalTween.start();
        rightUpperArmHorizontalTween.start();

        leftLowerArmLoop.start();
        


        leftLowerArmLoop.onStart(function(){
            rightUpperLegUpLoop.start()
        })
        leftLowerArmLoop.onRepeat(function(){
            rightLowerArmLoop.start().repeat(Infinity).yoyo(true);
            rightUpperLegDownLoop.start().chain(rightUpperLegUpLoop)
            // rightLowerLegDownLoop.start()
        });

        rightUpperLegDownLoop.onStart(function(){
            leftUpperLegUpLoop.start().chain(leftUpperLegDownLoop);
        })



        leftLowerArmLoop.repeat(Infinity).yoyo(true);
        

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
})