var moduleDependencies = {
	moduleUtilities: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/2%20-%20Kaeon%20Series/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/2%20-%20Modules/2%20-%20Utilities/1%20-%20Source/moduleUtilities.js",
	one: "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/1%20-%20APIs/1%20-%20Core/1%20-%20ONE/1%20-%20ONE/1%20-%20JavaScript/1%20-%20Source/ONE.js"
};

var moduleUtilities = require(moduleDependencies.moduleUtilities);
var one = require(moduleDependencies.one);

var ball = {

	onDeserialize: function(core, ace, entity) {

		if(one.getChild(ace, "ball") != null) {
	
			let ball = BABYLON.MeshBuilder.CreateSphere(
				"sphere",
				{ diameter: 2 },
				core.scene
			);

			entity.components.push(ball);
		}
	}
};

var ground = {

	onDeserialize: function(core, ace, entity) {

		if(one.getChild(ace, "ground") != null) {
			
			let item = one.getChild(ace, "ground");

			let texture = moduleUtilities.getItem(item, "texture");
			let map = moduleUtilities.getItem(item, "map");
			let subdivisions = Number(moduleUtilities.getItem(item, "subdivisions", "1000"));
			let width = Number(moduleUtilities.getItem(item, "width", "1"));
			let length = Number(moduleUtilities.getItem(item, "length", "1"));
			let height = Number(moduleUtilities.getItem(item, "height", "0"));

			var groundMaterial = new BABYLON.StandardMaterial("ground", core.scene);

			if(texture != null)
				groundMaterial.diffuseTexture = new BABYLON.Texture(texture, core.scene);

			let ground = null;

			if(map != null) {
				
				ground = BABYLON.Mesh.CreateGroundFromHeightMap(
					"ground",
					map,
					width,
					length,
					subdivisions,
					0,
					height,
					core.scene,
					false,
					function() {
						
					}
				);

				ground.material = groundMaterial;
			}

			else {

				ground = BABYLON.MeshBuilder.CreateGround(
					"ground",
					{
						width: width,
						height: length,
						subdivisions: 4
					},
					core.scene
				);

				ground.material = groundMaterial;
			}

			entity.components.push(ground);
		}
	}
};

var skybox = {

	skyboxes: [],

	onDeserialize: function(core, ace, entity) {

		if(one.getChild(ace, "skybox") != null) {
		
			var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 10000.0 }, core.scene);
	
			var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", core.scene);
			
			skyboxMaterial.backFaceCulling = false;

			skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
				one.getChild(
					one.getChild(ace, "skybox"),
					"source"
				).children[0].content, core.scene);

			skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
			skyboxMaterial.disableLighting = true;
	
			skybox.material = skyboxMaterial;

			this.skyboxes.push(skybox);

			entity.components.push(skybox);
		}	
	},

	onUpdate: function(core, delta) {
		
		for(let i = 0; i < this.skyboxes.length; i++)
			this.skyboxes[i].position = core.camera.position;
	}
};

module.exports = [
	ball,
	ground,
	skybox
];