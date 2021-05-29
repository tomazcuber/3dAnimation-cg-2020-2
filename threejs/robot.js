// Function to generate robot
// The strategy below is just a suggestion, you may change the shapes to create your customized robot
const head_size = 1.6;
const torso_height = 2.5 * head_size;
const torso_width = 2 * head_size;
const upper_arm_height = 1.5 * head_size;
const upper_arm_width = 0.6  * head_size;
const lower_arm_height = 0.8 * head_size;
const lower_arm_width = 0.8 * upper_arm_width;
const upper_leg_height = 2 * head_size;
const upper_leg_width = 0.4 * torso_width;
const lower_leg_height = 1.5 * head_size;
const lower_leg_width = 0.8 * upper_leg_width;
const hand_width = 1;
const hand_height = 1;
const foot_width = 1.5 * lower_leg_width;
const foot_height = 0.5;

function gen_robot() {
    // Creating Group (not necessary, but better readability)
    var robot = new THREE.Group();

    // torso
    var torso = gen_rect(torso_width, torso_height);
    createBodyPart(torso, "torso", [0,0,0]);

    // head
    var head = gen_circle(head_size);
    createBodyPart(head, "head", [0,4.5,-0.05]);
    
    // left: upper arm, arm, hand
    var left_upper_arm = gen_rect(upper_arm_width, upper_leg_height);
    createBodyPart(left_upper_arm, "left_upper_arm", [-2.6,0,0]);


    var left_lower_arm = gen_rect(lower_arm_width, lower_leg_height);
    createBodyPart(left_lower_arm, "left_lower_arm", [0,-3,0]);
    
    var left_hand = gen_rect(hand_width,hand_height);
    createBodyPart(left_hand, "left_hand", [0,-1.5,0]);

    // right: upper arm, arm, hand
    var right_upper_arm = left_upper_arm.clone();  
    createBodyPart(right_upper_arm, "right_upper_arm", [2.6,0,0]);

    var right_lower_arm = left_lower_arm.clone();
    createBodyPart(right_lower_arm, "right_lower_arm", [0,-3,0]);

    var right_hand = left_hand.clone();
    createBodyPart(right_hand, "right_hand", [0,-1.5,0]);

    // left: upper leg, leg, foot
    var left_upper_leg = gen_rect(upper_leg_width, upper_leg_height);
    createBodyPart(left_upper_leg, "left_upper_leg", [-1,-4,0]);

    var left_lower_leg = gen_rect(lower_leg_width,lower_leg_height);
    createBodyPart(left_lower_leg, "left_lower_leg", [0,-upper_leg_height,0]);

    var left_foot = gen_rect(foot_width, foot_height);
    createBodyPart(left_foot, "left_foot", [-0.2, -lower_leg_height * 0.8, 0]);


    // right: upper leg, leg, foot
    // TO DO
    var right_upper_leg = left_upper_leg.clone();
    createBodyPart(right_upper_leg, "righr_upper_leg", [1,-4,0]);

    var right_lower_leg = left_lower_leg.clone();
    createBodyPart(right_lower_leg, "right_lower_leg", [0, -upper_leg_height, 0]);

    var right_foot = left_foot.clone();
    createBodyPart(right_foot,"right_foot", [0.2, -lower_leg_height * 0.8, 0]);

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