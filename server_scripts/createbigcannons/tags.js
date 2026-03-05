// priority: 0
"use strict";

const CBC_DISABLED_ITEMS = [
    "create:iron_sheet",
    "createbigcannons:cast_iron_block",
    "createbigcannons:bronze_block",
    "createbigcannons:steel_block",
    "createbigcannons:nethersteel_block",
    "createbigcannons:cast_iron_ingot",
    'createbigcannons:bronze_ingot',
    'createbigcannons:steel_ingot',
    'createbigcannons:nethersteel_ingot',
    'createbigcannons:cast_iron_nugget',
    'createbigcannons:nethersteel_nugget',
    'createbigcannons:steel_scrap',
    'createbigcannons:bronze_scrap',
    'createbigcannons:gunpowder_pinch'
]
const registerCreateBigCannonsItemTags = (event) => {
    

    const disableItem = (item) => {
        event.removeAllTagsFrom(item)
        event.add('c:hidden_from_recipe_viewers', item)
    };

    CBC_DISABLED_ITEMS.forEach(item => {
        disableItem(item);
    });
    
}