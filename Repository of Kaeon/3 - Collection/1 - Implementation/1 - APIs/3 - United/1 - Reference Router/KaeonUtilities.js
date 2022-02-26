var root = "https://raw.githubusercontent.com/Atlas-of-Kaeon/Atlas-of-Kaeon.github.io/master/Repository%20of%20Kaeon/3%20-%20Collection/1%20-%20Implementation/"

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
			kaeonACE: {
				apis: {
					kaeonACECore: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/1%20-%20Core/1%20-%20Source/KaeonACECore.js",
					modules: {
						standardKaeonACE: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/2%20-%20Modules/3%20-%20Standard%20Kaeon%20ACE/1%20-%20Source/standardKaeonACE.js",
						units: {
							cameraModules: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/2%20-%20Modules/1%20-%20Units/2%20-%20Camera/1%20-%20Source/cameraModules.js",
							geometryModules: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/2%20-%20Modules/1%20-%20Units/3%20-%20Geometry/1%20-%20Source/geometryModules.js",
							standardModules: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/2%20-%20Modules/1%20-%20Units/1%20-%20Standard/1%20-%20Source/standardModules.js"
						},
						utilities: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/1%20-%20ONE/3%20-%20Kaeon%20ACE/1%20-%20APIs/1%20-%20Babylon/2%20-%20Modules/2%20-%20Utilities/1%20-%20Source/moduleUtilities.js"
					}
				},
				kaeonACE: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/1%20-%20ONE/3%20-%20Kaeon%20ACE/3%20-%20Kaeon%20ACE/1%20-%20JavaScript/1%20-%20Source/KaeonACE.js"
			},
			one: {
				fusion: root + "1%20-%20APIs/1%20-%20Core/1%20-%20ONE/2%20-%20FUSION/1%20-%20JavaScript/1%20-%20Source/FUSION.js",
				kaeonFUSION: root + "1%20-%20APIs/1%20-%20Core/1%20-%20ONE/3%20-%20Kaeon%20FUSION/1%20-%20JavaScript/1%20-%20Source/KaeonFUSION.js",
				one: root + "1%20-%20APIs/1%20-%20Core/1%20-%20ONE/1%20-%20ONE/1%20-%20JavaScript/1%20-%20Source/ONE.js",
				onePlus: root + "1%20-%20APIs/1%20-%20Core/1%20-%20ONE/4%20-%20ONE%2B/1%20-%20JavaScript/1%20-%20Source/ONEPlus.js",
				oneSuite: root + "1%20-%20APIs/1%20-%20Core/1%20-%20ONE/6%20-%20ONE%20Suite/1%20-%20JavaScript/1%20-%20Source/ONESuite.js",
				universalPreprocessor: root + "1%20-%20APIs/1%20-%20Core/1%20-%20ONE/5%20-%20Universal%20Preprocessor/1%20-%20JavaScript/1%20-%20Source/UniversalPreprocessor.js"
			},
			philosophersStone: {
				philosophersStone: root + "1%20-%20APIs/1%20-%20Core/2%20-%20Philosopher's%20Stone/1%20-%20Philosopher's%20Stone/1%20-%20JavaScript/1%20-%20Source/PhilosophersStone.js",
				soul: {
					soul: {
						soul: root + "1%20-%20APIs/1%20-%20Core/2%20-%20Philosopher's%20Stone/2%20-%20SOUL/3%20-%20SOUL/1%20-%20Current/1%20-%20JavaScript/1%20-%20Source/SOUL.js",
						soulLegacy: root + "1%20-%20APIs/1%20-%20Core/2%20-%20Philosopher's%20Stone/2%20-%20SOUL/3%20-%20SOUL/2%20-%20Legacy/1%20-%20JavaScript/1%20-%20Source/SOULLegacy.js"
					},
					soulEntity: root + "1%20-%20APIs/1%20-%20Core/2%20-%20Philosopher's%20Stone/2%20-%20SOUL/2%20-%20SOUL%20Entity/1%20-%20JavaScript/1%20-%20Source/SOULEntity.js",
					utilities: {
						binaryMap: root + "1%20-%20APIs/1%20-%20Core/2%20-%20Philosopher's%20Stone/2%20-%20SOUL/1%20-%20Utilities/1%20-%20Binary%20Map/1%20-%20JavaScript/1%20-%20Source/binaryMap.js",
						dataMap: {
							curveMethod: root + "1%20-%20APIs/1%20-%20Core/2%20-%20Philosopher's%20Stone/2%20-%20SOUL/1%20-%20Utilities/2%20-%20Data%20Map/2%20-%20Generators/1%20-%20Curve%20Method/1%20-%20JavaScript/1%20-%20Source/curveMethod.js",
							dataMap: root + "1%20-%20APIs/1%20-%20Core/2%20-%20Philosopher's%20Stone/2%20-%20SOUL/1%20-%20Utilities/2%20-%20Data%20Map/1%20-%20Data%20Map/1%20-%20JavaScript/1%20-%20Source/dataMap.js"
						},
						vectorConverter: root + "1%20-%20APIs/1%20-%20Core/2%20-%20Philosopher's%20Stone/2%20-%20SOUL/1%20-%20Utilities/3%20-%20Vector%20Converter/1%20-%20JavaScript/1%20-%20Source/vectorConverter.js"
					}
				}
			},
			uc: {
				csb: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/2%20-%20United/1%20-%20United%20C/3%20-%20CSB/1%20-%20JavaScript/1%20-%20Source/CSB.js",
				uc: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/2%20-%20United/1%20-%20United%20C/1%20-%20United%20C/1%20-%20JavaScript/1%20-%20Source/UC.js",
				ucc: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/2%20-%20United/1%20-%20United%20C/2%20-%20UCC/1%20-%20JavaScript/1%20-%20Source/UCC.js"
			},
			utilities: {
				software: {
					frameworks: {
						control: {
							commands: {
								drone: {
									controlDroneLaunch: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/2%20-%20Modules/1%20-%20Commands/3%20-%20Drone/1%20-%20Launch/1%20-%20JavaScript/1-Source/controlDroneLaunch.js"
								},
								gpio: {
									controlGPIOFlicker: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/2%20-%20Modules/1%20-%20Commands/2%20-%20GPIO/3%20-%20Flicker/1%20-%20JavaScript/1%20-%20Source/controlGPIOFlicker.js",
									controlGPIOFlip: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/2%20-%20Modules/1%20-%20Commands/2%20-%20GPIO/2%20-%20Flip/1%20-%20JavaScript/1%20-%20Source/controlGPIOFlip.js",
									controlGPIOSet: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/2%20-%20Modules/1%20-%20Commands/2%20-%20GPIO/1%20-%20Set/1%20-%20JavaScript/1%20-%20Source/controlGPIOSet.js"
								},
								receptor: {
									controlReceptorReset: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/2%20-%20Modules/1%20-%20Commands/1%20-%20Receptor/1%20-%20Reset/1%20-%20JavaScript/1%20%20-Source/controlReceptorReset.js",
									controlReceptorSet: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/2%20-%20Modules/1%20-%20Commands/1%20-%20Receptor/2%20-%20Set/1%20-%20JavaScript/1%20%20-Source/controlReceptorSet.js"
								}
							},
							control: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/1%20-%20Core/1%20-%20JavaScript/1%20-%20Source/control.js",
							devices: {
								controlRaspberryPi: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/2%20-%20Modules/2%20-%20Devices/1%20-%20Raspberry%20Pi/1%20-%20JavaScript/1%20-%20Source/controlRaspberryPi.js"
							},
							services: {
								controlHologram: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/2%20-%20Modules/3%20-%20Services/1%20-%20Hologram/1%20-%20JavaScript/1%20-%20Source/controlHologram.js"
							},
							utilities: {
								drone: {
									commands: {
										tello: {
											telloLaunch: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/3%20-%20Utilities/1%20-%20Drones/2%20-%20Commands/1%20-%20Launch/1%20-%20Tello/1%20-%20JavaScript/1%20-%20Source/telloLaunch.js"
										}
									},
									droneIdentifier: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/3%20-%20Control/3%20-%20Utilities/1%20-%20Drones/1%20-%20Identifier/1%20-%20JavaScript/1%20-%20Source/droneIdentifier.js"
								}
							}
						},
						vision: {
							utilities: {
								audio: {
									speech: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/2%20-%20Utilities/2%20-%20Audio/1%20-%20Speech/1%20-%20JavaScript/1%20-%20Source/speech.js"
								},
								visual: {
									general: {
										dimensions: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/2%20-%20Utilities/1%20-%20Visual/1%20-%20General/2%20-%20Dimensions/1%20-%20JavaScript/1%20-%20Source/Dimensions.js",
										input: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/2%20-%20Utilities/1%20-%20Visual/1%20-%20General/1%20-%20Input/1%20-%20JavaScript/1%20-%20Source/input.js"
									},
									widgets: {
										general: {
											widgets: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/2%20-%20Utilities/1%20-%20Visual/2%20-%20Widgets/1%20-%20General/1%20-%20JavaScript/1%20-%20Source/widgets.js"
										},
										miscellaneous: {
											search: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/2%20-%20Utilities/1%20-%20Visual/2%20-%20Widgets/2%20-%20Misc/1%20-%20Search/1%20-%20JavaScript/1%20-%20Source/search.js",
											youtube: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/2%20-%20Utilities/1%20-%20Visual/2%20-%20Widgets/2%20-%20Misc/2%20-%20YouTube/1%20-%20JavaScript/1%20-%20Source/youtube.js"
										}
									}
								}
							},
							vision: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/1%20-%20Vision/1%20-%20Core/1%20-%20JavaScript/1%20-%20Source/vision.js"
						},
						waypoint: {
							waypoint: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/2%20-%20Frameworks/2%20-%20Waypoint/1%20-%20Core/1%20-%20JavaScript/1%20-%20Source/waypoint.js"
						}
					},
					general: {
						application: {
							management: {
								network: {
									server: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/2%20-%20Application/1%20-%20Management/1%20-%20Network/1%20-%20Server/1%20-%20JavaScript/1%20-%20Source/server.js",
									wifi: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/2%20-%20Application/1%20-%20Management/1%20-%20Network/2%20-%20WiFi/1%20-%20JavaScript/1%20-%20Source/wifi.js"
								},
								process: {
									override: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/2%20-%20Application/1%20-%20Management/2%20-%20Process/2%20-%20Override/1%20-%20JavaScript/1%20-%20Source/override.js",
									platform: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/2%20-%20Application/1%20-%20Management/2%20-%20Process/1%20-%20Platform/1%20-%20JavaScript/1%20-%20Source/platform.js"
								},
								serial: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/2%20-%20Application/1%20-%20Management/3%20-%20Devices/1%20-%20Serial/1%20-%20JavaScript/1%20-%20Source/serial.js"
							},
							operations: {
								jsh: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/2%20-%20Application/2%20-%20Operations/2%20-%20JSH/1%20-%20JavaScript/1%20-%20Source/jsh.js",
								virtualSystem: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/2%20-%20Application/2%20-%20Operations/1%20-%20Virtual%20System/1%20-%20JavaScript/1%20-%20Source/virtualSystem.js"
							}
						},
						data: {
							API: {
								httpUtils: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/3%20-%20API/1%20-%20HTTP%20Utilities/1%20-%20JavaScript/1%20-%20Source/httpUtils.js",
								repoExplorer: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/3%20-%20API/2%20-%20Repo%20Explorer/1%20-%20JavaScript/1%20-%20Source/repoExplorer.js",
								searchUtils: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/3%20-%20API/3%20-%20Search%20Utilities/1%20-%20JavaScript/1%20-%20Source/searchUtils.js"
							},
							io: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/1%20-%20IO/1%20-%20JavaScript/1%20-%20Source/io.js",
							parsing: {
								formatConverter: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/2%20-%20Parsing/3%20-%20Format%20Converter/1%20-%20JavaScript/1%20-%20Source/formatConverter.js",
								tokenizer: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/2%20-%20Parsing/1%20-%20Tokenizer/1%20-%20JavaScript/1%20-%20Source/tokenizer.js",
								utilities: {
									ONE: {
										paperONE: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/2%20-%20Parsing/2%20-%20Utilities/1%20-%20ONE/2%20-%20Paper%20ONE/1%20-%20JavaScript/1%20-%20Source/paperONE.js",
										wrapONE: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/2%20-%20Utilities/1%20-%20Software/1%20-%20Kaeon%20APIs/1%20-%20General/1%20-%20Modules/1%20-%20Data/2%20-%20Parsing/2%20-%20Utilities/1%20-%20ONE/1%20-%20Wrap%20ONE/1%20-%20Javascript/1%20-%20Source/wrapONE.js"
									}
								}
							}
						}
					}
				}
			}
		},
		one: {
			interfaces: {
				standard: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/1%20-%20ONE/1%20-%20Kaeon%20FUSION/1%20-%20Modules/1%20-%20Standard/1%20-%20JavaScript/1%20-%20Source/Standard.js"
			},
			syntaxes: {
				oneLISP: root + "1%20-%20APIs/2%20-%20Kaeon%20Series/1%20-%20ONE/2%20-%20Universal%20Preprocessor/1%20-%20Modules/1%20-%20ONE/1%20-%20ONE%20LISP/1%20-%20JavaScript/1%20-%20Source/ONELisp.js"
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