// Function to generate robot
// The strategy below is just a suggestion, you may change the shapes to create your customized robot

const robotSizes = 
{
    head_size: 1.6,
    torso_height: 4,
    torso_width : 3.2,
    upper_arm_height : 2.4,
    upper_arm_width : 0.96,
    lower_arm_height : 1.28,
    lower_arm_width : 0.768,
    upper_leg_height : 3.2,
    upper_leg_width : 1.28,
    lower_leg_height : 2.4,
    lower_leg_width : 1.024,
    hand_width : 1,
    hand_height : 1,
    foot_width : 1.536,
    foot_height : 0.5,
};

const robotPositions = 
{   
    torso: [0,0,0],
    head: [0, 4.5,-0.05],
    left_upper_arm: [-2.6,0,0],
    lower_arm: [0,-2,0],
    hand: [0,-1.5,0],
    left_upper_leg: [-1,-4,0],
    right_upper_leg: [1,-4,0],
    lower_leg: [0,-robotSizes.upper_leg_height,0],
    left_foot: [-0.2, -robotSizes.lower_leg_height * 0.8, 0],
    right_foot: [0.2, -robotSizes.lower_leg_height * 0.8, 0]
}

function gen_robot() {
    // Creating Group (not necessary, but better readability)
    var robot = new THREE.Group();

    // torso
    var torso = gen_rect(robotSizes.torso_width, robotSizes.torso_height);
    createBodyPart(torso, "torso", robotPositions.torso);

    // head
    var head = gen_circle(robotSizes.head_size);
    createBodyPart(head, "head", robotPositions.head);
    
    // left: upper arm, arm, hand
    var left_upper_arm = gen_rect(robotSizes.upper_arm_width, robotSizes.upper_arm_height);
    createBodyPart(left_upper_arm, "left_upper_arm", robotPositions.left_upper_arm);


    var left_lower_arm = gen_rect(robotSizes.lower_arm_width, robotSizes.lower_arm_height);
    createBodyPart(left_lower_arm, "left_lower_arm", robotPositions.lower_arm);
    
    var left_hand = gen_rect(robotSizes.hand_width,robotSizes.hand_height);
    createBodyPart(left_hand, "left_hand", robotPositions.hand);

    // right: upper arm, arm, hand
    var right_upper_arm = left_upper_arm.clone();  
    createBodyPart(right_upper_arm, "right_upper_arm", robotPositions.left_upper_arm.map((x) => {return -x;}) );

    var right_lower_arm = left_lower_arm.clone();
    createBodyPart(right_lower_arm, "right_lower_arm", robotPositions.lower_arm);

    var right_hand = left_hand.clone();
    createBodyPart(right_hand, "right_hand", robotPositions.hand);

    // left: upper leg, leg, foot
    var left_upper_leg = gen_rect(robotSizes.upper_leg_width, robotSizes.upper_leg_height);
    createBodyPart(left_upper_leg, "left_upper_leg", robotPositions.left_upper_leg);

    var left_lower_leg = gen_rect(robotSizes.lower_leg_width,robotSizes.lower_leg_height);
    createBodyPart(left_lower_leg, "left_lower_leg", robotPositions.lower_leg);

    var left_foot = gen_rect(robotSizes.foot_width, robotSizes.foot_height);
    createBodyPart(left_foot, "left_foot", robotPositions.left_foot);


    // right: upper leg, leg, foot
    // TO DO
    var right_upper_leg = left_upper_leg.clone();
    createBodyPart(right_upper_leg, "righr_upper_leg", robotPositions.right_upper_leg);

    var right_lower_leg = left_lower_leg.clone();
    createBodyPart(right_lower_leg, "right_lower_leg", robotPositions.lower_leg);

    var right_foot = left_foot.clone();
    createBodyPart(right_foot,"right_foot", robotPositions.right_foot);

    // Creating hieararchy
    robot.add(torso);
    
    torso.add(head);
    
    torso.add(left_upper_arm);
    left_upper_arm.add(left_lower_arm);
    left_lower_arm.add(left_hand);
    
    torso.add(right_upper_arm);
    right_upper_arm.add(right_lower_arm);
    right_lower_arm.add(right_hand);
    
    torso.add(left_upper_leg);
    left_upper_leg.add(left_lower_leg);
    left_lower_leg.add(left_foot);
    
    torso.add(right_upper_leg);
    right_upper_leg.add(right_lower_leg);
    right_lower_leg.add(right_foot);
    


    robot.name = "robot";

    return robot
}

function createBodyPart(part, name, position) {
    part.name = name;
    part.position.set(position[0],position[1],position[2]);
}


// Auxiliary function to generate rectangle
function gen_rect( width, height ) {
    var plane_geometry = new THREE.PlaneGeometry( width, height );
    var plane_material = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh(plane_geometry, plane_material);

    return plane;
}

// Auxiliary function to generate circle
function gen_circle( radius, segs = 30 ) {
    var circle_geometry = new THREE.CircleGeometry( radius, segs);
    var circle_material = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff} );
    var circle = new THREE.Mesh(circle_geometry, circle_material);

    return circle
}

// Auxiliary function to generate triangle
function gen_triangle( size, v1 = new THREE.Vector3(-1, 0, 0), v2 = new THREE.Vector3(1, 0, 0), v3 = new THREE.Vector3(-1, 1, 0) ) {
    var triangle_geometry = new THREE.Geometry();
    var triangle = new THREE.Triangle(v1, v2, v3);
    var normal = triangle.normal();
    triangle_geometry.vertices.push(triangle.a);
    triangle_geometry.vertices.push(triangle.b);
    triangle_geometry.vertices.push(triangle.c);
    triangle_geometry.faces.push(new THREE.Face3(0, 1, 2, normal));
    var triangle = new THREE.Mesh(triangle_geometry, new THREE.MeshNormalMaterial());
    
    triangle.size = size;

    return triangle;
}