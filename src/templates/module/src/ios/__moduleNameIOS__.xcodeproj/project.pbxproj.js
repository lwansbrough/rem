export default (config) => {
  return (
`// !$*UTF8*$!
{
	archiveVersion = 1;
	classes = {
	};
	objectVersion = 46;
	objects = {

/* Begin PBXBuildFile section */
		13BE3DEE1AC21097009241FE /* ${config.ios.moduleName}.m in Sources */ = {isa = PBXBuildFile; fileRef = 13BE3DED1AC21097009241FE /* ${config.ios.moduleName}.m */; };
/* End PBXBuildFile section */

/* Begin PBXCopyFilesBuildPhase section */
		58B511D91A9E6C8500147676 /* CopyFiles */ = {
			isa = PBXCopyFilesBuildPhase;
			buildActionMask = 2147483647;
			dstPath = "include/$(PRODUCT_NAME)";
			dstSubfolderSpec = 16;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXCopyFilesBuildPhase section */

/* Begin PBXFileReference section */
		134814201AA4EA6300B7C361 /* lib${config.ios.moduleName}.a */ = {isa = PBXFileReference; explicitFileType = archive.ar; includeInIndex = 0; path = lib${config.ios.moduleName}.a; sourceTree = BUILT_PRODUCTS_DIR; };
		13BE3DEC1AC21097009241FE /* ${config.ios.moduleName}.h */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.c.h; path = ${config.ios.moduleName}.h; sourceTree = "<group>"; };
		13BE3DED1AC21097009241FE /* ${config.ios.moduleName}.m */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.c.objc; path = ${config.ios.moduleName}.m; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
		58B511D81A9E6C8500147676 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		134814211AA4EA7D00B7C361 /* Products */ = {
			isa = PBXGroup;
			children = (
				134814201AA4EA6300B7C361 /* lib${config.ios.moduleName}.a */,
			);
			name = Products;
			sourceTree = "<group>";
		};
		58B511D21A9E6C8500147676 = {
			isa = PBXGroup;
			children = (
				13BE3DEC1AC21097009241FE /* ${config.ios.moduleName}.h */,
				13BE3DED1AC21097009241FE /* ${config.ios.moduleName}.m */,
				134814211AA4EA7D00B7C361 /* Products */,
			);
			sourceTree = "<group>";
		};
/* End PBXGroup section */

/* Begin PBXNativeTarget section */
		58B511DA1A9E6C8500147676 /* ${config.ios.moduleName} */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = 58B511EF1A9E6C8500147676 /* Build configuration list for PBXNativeTarget "${config.ios.moduleName}" */;
			buildPhases = (
				58B511D71A9E6C8500147676 /* Sources */,
				58B511D81A9E6C8500147676 /* Frameworks */,
				58B511D91A9E6C8500147676 /* CopyFiles */,
			);
			buildRules = (
			);
			dependencies = (
			);
			name = ${config.ios.moduleName};
			productName = RCTDataManager;
			productReference = 134814201AA4EA6300B7C361 /* lib${config.ios.moduleName}.a */;
			productType = "com.apple.product-type.library.static";
		};
/* End PBXNativeTarget section */

/* Begin PBXProject section */
		58B511D31A9E6C8500147676 /* Project object */ = {
			isa = PBXProject;
			attributes = {
				LastUpgradeCheck = 0610;
				ORGANIZATIONNAME = Facebook;
				TargetAttributes = {
					58B511DA1A9E6C8500147676 = {
						CreatedOnToolsVersion = 6.1.1;
					};
				};
			};
			buildConfigurationList = 58B511D61A9E6C8500147676 /* Build configuration list for PBXProject "${config.ios.moduleName}" */;
			compatibilityVersion = "Xcode 3.2";
			developmentRegion = English;
			hasScannedForEncodings = 0;
			knownRegions = (
				en,
			);
			mainGroup = 58B511D21A9E6C8500147676;
			productRefGroup = 58B511D21A9E6C8500147676;
			projectDirPath = "";
			projectRoot = "";
			targets = (
				58B511DA1A9E6C8500147676 /* ${config.ios.moduleName} */,
			);
		};
/* End PBXProject section */

/* Begin PBXSourcesBuildPhase section */
		58B511D71A9E6C8500147676 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				13BE3DEE1AC21097009241FE /* ${config.ios.moduleName}.m in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXSourcesBuildPhase section */

/* Begin XCBuildConfiguration section */
		58B511ED1A9E6C8500147676 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++0x";
				CLANG_CXX_LIBRARY = "libc++";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				GCC_C_LANGUAGE_STANDARD = gnu99;
				GCC_DYNAMIC_NO_PIC = NO;
				GCC_OPTIMIZATION_LEVEL = 0;
				GCC_PREPROCESSOR_DEFINITIONS = (
					"DEBUG=1",
					"$(inherited)",
				);
				GCC_SYMBOLS_PRIVATE_EXTERN = NO;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 7.0;
				MTL_ENABLE_DEBUG_INFO = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = iphoneos;
			};
			name = Debug;
		};
		58B511EE1A9E6C8500147676 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++0x";
				CLANG_CXX_LIBRARY = "libc++";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = YES;
				ENABLE_NS_ASSERTIONS = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				GCC_C_LANGUAGE_STANDARD = gnu99;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 7.0;
				MTL_ENABLE_DEBUG_INFO = NO;
				SDKROOT = iphoneos;
				VALIDATE_PRODUCT = YES;
			};
			name = Release;
		};
		58B511F01A9E6C8500147676 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				HEADER_SEARCH_PATHS = (
					"$(inherited)",
					/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include,
					"$(SRCROOT)/../../React/**",
					"$(SRCROOT)/../../node_modules/react-native/React/**",
				);
				LIBRARY_SEARCH_PATHS = "$(inherited)";
				OTHER_LDFLAGS = "-ObjC";
				PRODUCT_NAME = ${config.ios.moduleName};
				SKIP_INSTALL = YES;
			};
			name = Debug;
		};
		58B511F11A9E6C8500147676 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				HEADER_SEARCH_PATHS = (
					"$(inherited)",
					/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include,
					"$(SRCROOT)/../../React/**",
				);
				LIBRARY_SEARCH_PATHS = "$(inherited)";
				OTHER_LDFLAGS = "-ObjC";
				PRODUCT_NAME = ${config.ios.moduleName};
				SKIP_INSTALL = YES;
			};
			name = Release;
		};
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
		58B511D61A9E6C8500147676 /* Build configuration list for PBXProject "${config.ios.moduleName}" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				58B511ED1A9E6C8500147676 /* Debug */,
				58B511EE1A9E6C8500147676 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		58B511EF1A9E6C8500147676 /* Build configuration list for PBXNativeTarget "${config.ios.moduleName}" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				58B511F01A9E6C8500147676 /* Debug */,
				58B511F11A9E6C8500147676 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
/* End XCConfigurationList section */
	};
	rootObject = 58B511D31A9E6C8500147676 /* Project object */;
}
`);
}
