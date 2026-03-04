// priority: 0
"use strict"


/**
 * @param {Internal.RecipesEventJS} event 
 */
const registerCreateBigCannonsRecipes = (event) => {

    // #region Remove Recipes
    event.remove([
        { mod: "createbigcannons", output: '#createbigcannons:nugget_bronze'},
        { mod: "createbigcannons", output: '#createbigcannons:nugget_cast_iron' },
        { mod: "createbigcannons", output: 'createbigcannons:steel_scrap' },
        { mod: "createbigcannons", output: '#c:nuggets/nethersteel'},

        { mod: "createbigcannons", output: '#createbigcannons:ingot_bronze' },
        { mod: "createbigcannons", output: '#createbigcannons:ingot_cast_iron' },
        { mod: "createbigcannons", output: 'createbigcannons:steel_ingot' },
        { mod: "createbigcannons", output: '#createbigcannons:ingot_nethersteel' },

        { mod: "createbigcannons", output: '#createbigcannons:block_bronze' },
        { mod: "createbigcannons", output: '#createbigcannons:block_cast_iron' },
        { mod: "createbigcannons", output: 'createbigcannons:steel_block' },
        { mod: "createbigcannons", output: 'createbigcannons:nethersteel_block' },

        { input: 'createbigcannons:gunpowder_pinch' },
        { output: 'createbigcannons:gunpowder_pinch' },

        { mod: "createbigcannons", output: '#createbigcannons:guncotton' },

        { type: 'createbigcannons:melting' },
        { id: 'createbigcannons/mixing/guncotton' },
    ]);
    // #endregion

    //#region Replace Fluids
    //#endregion

    //#region Replace Items/Blocks
    event.replaceInput({}, '#createbigcannons:nugget_cast_iron', '#forge:nuggets/iron');
    event.replaceInput({}, '#createbigcannons:ingot_cast_iron', '#forge:ingots/iron');
    event.replaceInput({}, '#createbigcannons:block_cast_iron', '#forge:storage_blocks/iron');
    //#endregion

    //#region Custom
    const CANNON_CASTING = { // Preset
        SHAPES: [
            "createbigcannons:screw_breech", 
            "createbigcannons:sliding_breech", 
            "createbigcannons:autocannon_recoil_spring", 
            "createbigcannons:autocannon_breech",
            "createbigcannons:autocannon_barrel",
            "createbigcannons:cannon_end",
            "createbigcannons:very_small",
            "createbigcannons:small",
            "createbigcannons:medium",
            "createbigcannons:large",

        ],
        FLUID_TAG: [
            "forge:iron", 
            "forge:bronze", 
            "forge:steel", 
            "forge:black_steel"
        ],
        FLUID_TAG_TITMAP: { // Fluid tag (to item map = TITMAP) 
            "forge:iron": "cast_iron",
            "forge:bronze": "bronze",
            "forge:steel": "steel",
            "forge:black_steel": "nethersteel"
        }
    }

    CANNON_CASTING.FLUID_TAG.forEach(ftag => {
        CANNON_CASTING.SHAPES.forEach(shape => {
            let prefix = "unbored_"
            let sufix = "_" + shape.split(":")[1]
            /* event.custom({
                "type": "createbigcannons:cannon_casting",
                "cast_shape": shape,
                "fluid": {
                    "amount": 1,
                    "fluidTag": ftag
                },
                "result": "createbigcannons:" + prefix + CANNON_CASTING.FLUID_TAG_TITMAP[ftag] + sufix
            }).id("t5a:cbc/"+ prefix + CANNON_CASTING.FLUID_TAG_TITMAP[ftag] + sufix); */
        });
        
    });

    // #endregion


    // #region Shaped Crafting
    event.shaped('2x createbigcannons:casting_sand', [
        'ABA',
		'CDC',
		'ABA'
	], {
		A: '#forge:powders/graphite',
		B: '#forge:dusts/kaolinite',
		C: '#forge:sand',
        D: '#forge:ingots/clay'
	}).id('t5a:cbc/castingsand')

    // #endregion

    // #region Pressing/Forge Hammer

    // Packed Gunpowder
    event.recipes.greate
        .pressing('createbigcannons:packed_gunpowder', '3x #forge:gunpowder')
        .recipeTier(1)
        .id("t5a:cbc/pressing/packed_gunpowder")
    event.recipes.gtceu
        .forge_hammer("t5a:cbc/forge_hammer/packed_gunpowder")
        .itemInputs('3x #forge:gunpowder')
        .itemOutputs('createbigcannons:packed_gunpowder')
        .EUt(GTValues.VA[GTValues.LV])
		.duration(30)

    
    // Packed Guncotton
    event.recipes.greate
        .pressing(
            ['1x createbigcannons:packed_guncotton'], 
            ['3x createbigcannons:guncotton']
        )
        .circuitNumber(1)
        .recipeTier(2)
        .id("t5a:cbc/pressing/packed_guncotton")
    event.recipes.gtceu
        .forge_hammer("t5a:cbc/forge_hammer/packed_guncotton")
        .itemInputs('3x createbigcannons:guncotton')
        .itemOutputs('createbigcannons:packed_guncotton')
        .EUt(GTValues.VA[GTValues.MV])
		.duration(20)
    // #endregion


    // #region Mixing

    // Guncotton
    event.recipes.gtceu
        .mixer("t5a:cbc/mixer/guncotton")
        .itemInputs('1x #forge:paper', '2x tfg:nitrocellulose')
        .inputFluids(Fluid.of('gtceu:distilled_water', 100))
        .itemOutputs('3x createbigcannons:guncotton')
        .EUt(GTValues.VA[GTValues.MV])
        .duration(50)
    // #endregion
}
