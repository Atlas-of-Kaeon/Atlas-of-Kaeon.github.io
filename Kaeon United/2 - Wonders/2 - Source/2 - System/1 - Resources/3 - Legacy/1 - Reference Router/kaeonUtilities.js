var root = "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Kaeon%20United/2%20-%20Wonders/2%20-%20Source/"

var moduleDependencies = {
	applications: {
		cors: {
			ghostCORS: "https://ghost-cors.herokuapp.com/"
		},
		kaeonOrigin: root + "3%20-%20Applications/1%20-%20Kaeon%20Origin/2%20-%20Monolith/kaeonOrigin.js"
	},
	kaeonUnited: root + "3%20-%20Applications/1%20-%20Kaeon%20Origin/1%20-%20Legacy/kaeonOrigin.js",
	modules: {
		js: {
			generalReference: "2%20-%20System/1%20-%20Resources/1%20-%20Interfaces/2%20-%20General%20Interface/1%20-%20Module/generalReference.js",
			kaeonACE: {
				apis: {
					kaeonACECore: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/1%20-%20Core/KaeonACECore.js",
					modules: {
						standardKaeonACE: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/2%20-%20Modules/3%20-%20Standard%20Kaeon%20ACE/standardKaeonACE.js",
						units: {
							cameraModules: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/2%20-%20Modules/1%20-%20Units/2%20-%20Camera/cameraModules.js",
							geometryModules: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/2%20-%20Modules/1%20-%20Units/3%20-%20Geometry/geometryModules.js",
							standardModules: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/2%20-%20Modules/1%20-%20Units/1%20-%20Standard/standardModules.js"
						},
						utilities: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/2%20-%20Modules/2%20-%20Utilities/moduleUtilities.js"
					}
				},
				kaeonACE: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/1%20-%20ONE/3%20-%20Kaeon%20ACE/3%20-%20Kaeon%20ACE/KaeonACE.js"
			},
			one: {
				fusion: root + "1%20-%20APIs/1%20-%20Core/1%20-%20ONE/2%20-%20FUSION/FUSION.js",
				kaeonFUSION: root + "1%20-%20APIs/1%20-%20Core/1%20-%20ONE/3%20-%20Kaeon%20FUSION/KaeonFUSION.js",
				kaeonLibraryManager: root + "1%20-%20APIs/1%20-%20Core/1%20-%20ONE/7%20-%20Kaeon%20Library%20Manager/kaeonLibraryManager.js",
				one: root + "1%20-%20APIs/1%20-%20Core/1%20-%20ONE/1%20-%20ONE/ONE.js",
				onePlus: root + "1%20-%20APIs/1%20-%20Core/1%20-%20ONE/4%20-%20ONE%2B/ONEPlus.js",
				oneSuite: root + "1%20-%20APIs/1%20-%20Core/1%20-%20ONE/6%20-%20ONE%20Suite/ONESuite.js",
				universalPreprocessor: root + "1%20-%20APIs/1%20-%20Core/1%20-%20ONE/5%20-%20Universal%20Preprocessor/UniversalPreprocessor.js"
			},
			philosophersStone: {
				philosophersStone: root + "1%20-%20APIs/1%20-%20Core/2%20-%20Philosopher's%20Stone/1%20-%20Philosopher's%20Stone/PhilosophersStone.js",
				soul: {
					soul: {
						soul: root + "1%20-%20APIs/1%20-%20Core/2%20-%20Philosopher's%20Stone/2%20-%20SOUL/3%20-%20SOUL/1%20-%20Current/SOUL.js",
						soulLegacy: root + "1%20-%20APIs/1%20-%20Core/2%20-%20Philosopher's%20Stone/2%20-%20SOUL/3%20-%20SOUL/2%20-%20Legacy/SOULLegacy.js"
					},
					soulEntity: root + "1%20-%20APIs/1%20-%20Core/2%20-%20Philosopher's%20Stone/2%20-%20SOUL/2%20-%20SOUL%20Entity/SOULEntity.js",
					utilities: {
						binaryMap: root + "1%20-%20APIs/1%20-%20Core/2%20-%20Philosopher's%20Stone/2%20-%20SOUL/1%20-%20Utilities/1%20-%20Binary%20Map/binaryMap.js",
						dataMap: {
							curveMethod: root + "1%20-%20APIs/1%20-%20Core/2%20-%20Philosopher's%20Stone/2%20-%20SOUL/1%20-%20Utilities/2%20-%20Data%20Map/2%20-%20Generators/1%20-%20Curve%20Method/curveMethod.js",
							dataMap: root + "1%20-%20APIs/1%20-%20Core/2%20-%20Philosopher's%20Stone/2%20-%20SOUL/1%20-%20Utilities/2%20-%20Data%20Map/1%20-%20Data%20Map/dataMap.js"
						},
						vectorConverter: root + "1%20-%20APIs/1%20-%20Core/2%20-%20Philosopher's%20Stone/2%20-%20SOUL/1%20-%20Utilities/3%20-%20Vector%20Converter/vectorConverter.js"
					}
				}
			},
			uc: {
				csb: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20United/1%20-%20United%20C/3%20-%20CSB/CSB.js",
				uc: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20United/1%20-%20United%20C/1%20-%20United%20C/UC.js",
				ucc: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20United/1%20-%20United%20C/2%20-%20UCC/UCC.js"
			},
			utilities: {
				software: {
					frameworks: {
						control: {
							commands: {
								drone: {
									controlDroneLaunch: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/2%20-%20Modules/1%20-%20Commands/3%20-%20Drone/1%20-%20Launch/1%20-%20JavaScript/1-Source/controlDroneLaunch.js"
								},
								gpio: {
									controlGPIOFlicker: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/2%20-%20Modules/1%20-%20Commands/2%20-%20GPIO/3%20-%20Flicker/controlGPIOFlicker.js",
									controlGPIOFlip: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/2%20-%20Modules/1%20-%20Commands/2%20-%20GPIO/2%20-%20Flip/controlGPIOFlip.js",
									controlGPIOSet: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/2%20-%20Modules/1%20-%20Commands/2%20-%20GPIO/1%20-%20Set/controlGPIOSet.js"
								},
								receptor: {
									controlReceptorReset: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/2%20-%20Modules/1%20-%20Commands/1%20-%20Receptor/1%20-%20Reset/1%20-%20JavaScript/1%20%20-Source/controlReceptorReset.js",
									controlReceptorSet: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/2%20-%20Modules/1%20-%20Commands/1%20-%20Receptor/2%20-%20Set/1%20-%20JavaScript/1%20%20-Source/controlReceptorSet.js"
								}
							},
							control: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/1%20-%20Core/control.js",
							devices: {
								controlRaspberryPi: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/2%20-%20Modules/2%20-%20Devices/1%20-%20Raspberry%20Pi/controlRaspberryPi.js"
							},
							services: {
								controlHologram: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/2%20-%20Modules/3%20-%20Services/1%20-%20Hologram/controlHologram.js"
							},
							utilities: {
								drone: {
									commands: {
										tello: {
											telloLaunch: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/3%20-%20Utilities/1%20-%20Drones/2%20-%20Commands/1%20-%20Launch/1%20-%20Tello/telloLaunch.js"
										}
									},
									droneIdentifier: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/3%20-%20Utilities/1%20-%20Drones/1%20-%20Identifier/droneIdentifier.js"
								}
							}
						},
						vision: {
							utilities: {
								audio: {
									speech: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/2%20-%20Utilities/2%20-%20Audio/1%20-%20Speech/speech.js"
								},
								visual: {
									general: {
										dimensions: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/2%20-%20Utilities/1%20-%20Visual/1%20-%20General/2%20-%20Dimensions/Dimensions.js",
										input: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/2%20-%20Utilities/1%20-%20Visual/1%20-%20General/1%20-%20Input/input.js"
									},
									widgets: {
										general: {
											widgets: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/2%20-%20Utilities/1%20-%20Visual/2%20-%20Widgets/1%20-%20General/widgets.js"
										},
										miscellaneous: {
											search: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/2%20-%20Utilities/1%20-%20Visual/2%20-%20Widgets/2%20-%20Misc/1%20-%20Search/search.js"
										}
									}
								}
							},
							vision: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/1%20-%20Core/vision.js"
						},
						waypoint: {
							waypoint: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/2%20-%20Frameworks/2%20-%20Waypoint/1%20-%20Core/waypoint.js"
						}
					},
					general: {
						data: {
							httpUtils: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Data/3%20-%20HTTP%20Utilities/httpUtils.js",
							io: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Data/1%20-%20IO/io.js",
							parsing: {
								formatConverter: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Data/2%20-%20Parsing/3%20-%20Format%20Converter/formatConverter.js",
								tokenizer: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Data/2%20-%20Parsing/1%20-%20Tokenizer/tokenizer.js",
								utilities: {
									ONE: {
										paperONE: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Data/2%20-%20Parsing/2%20-%20Utilities/1%20-%20ONE/2%20-%20Paper%20ONE/paperONE.js",
										wrapONE: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Data/2%20-%20Parsing/2%20-%20Utilities/1%20-%20ONE/1%20-%20Wrap%20ONE/wrapONE.js"
									}
								}
							}
						},
						management: {
							network: {
								server: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/1%20-%20General/2%20-%20Management/1%20-%20Network/1%20-%20Server/server.js",
								wifi: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/1%20-%20General/2%20-%20Management/1%20-%20Network/2%20-%20WiFi/wifi.js"
							},
							process: {
								override: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/1%20-%20General/2%20-%20Management/2%20-%20Process/2%20-%20Override/override.js",
								platform: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/1%20-%20General/2%20-%20Management/2%20-%20Process/1%20-%20Platform/platform.js"
							},
							serial: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/1%20-%20General/2%20-%20Management/3%20-%20Devices/1%20-%20Serial/serial.js"
						},
						operations: {
							jsh: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/1%20-%20General/3%20-%20Operations/2%20-%20JSH/jsh.js",
							virtualSystem: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/1%20-%20General/3%20-%20Operations/1%20-%20Virtual%20System/virtualSystem.js"
						},
						generalUniverse: "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/2%20-%20Kaeon%20APIs/1%20-%20General/4%20-%20Processes/1%20-%20Simulation/1%20-%20General%20Universe/generalUniverse.js"
					}
				}
			}
		},
		one: {
			interfaces: {
				standard: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/1%20-%20ONE/1%20-%20Kaeon%20FUSION/1%20-%20Modules/1%20-%20Standard/Standard.js"
			},
			syntaxes: {
				oneLISP: root + "1%20-%20APIs/2%20-%20Utilities/1%20-%20Software/1%20-%20ONE/2%20-%20Universal%20Preprocessor/1%20-%20Modules/1%20-%20ONE/1%20-%20ONE%20LISP/ONELisp.js"
			}
		}
	}
}

function getModule(modules, item) {

	item = item.replace(/\s+/g, '').toLowerCase();

	let keys = Object.keys(modules);

	for(let i = 0; i < keys.length; i++) {

		let value = modules[keys[i]];

		if(typeof value == "string") {

			let key = keys[i].replace(/\s+/g, '').toLowerCase();
	
			if(item == key)
				return value;
		}

		else {

			let path = getModule(value, item);

			if(path != null)
				return path;
		}
	}

	return null;
}

module.exports = (item) => {

	if(item == null)
		return moduleDependencies;

	if(typeof item == "string") {

		let path = getModule(moduleDependencies.modules, item);

		return path != null ?
			require(path) :
			getModule(moduleDependencies.applications, item);
	}

	Object.values(
		moduleDependencies.modules.one.interfaces
	).forEach((value) => {
		require(value)(item);
	});
}