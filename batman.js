// Created a class of Trainer
class Trainer {
    constructor() {
            this.pokemon = [];
        }
        //Gets pokemon based on its name along with stats
    getPokemon(name) {
            let found = this.pokemon.find(function(element) {
                if (element.name == name) {
                    return true;
                }
            });
            return found;
        }
        //Returns pokemon with its abilities and stats
    allPokemon() {
        return this.pokemon
    }

    addPokemon(newPokemon) {
        this.pokemon.push(newPokemon);
    }
}

// Our Trainers are Batman && Ash Ketchum
let batman = new Trainer();


// Class Pokemon holds information
class Pokemon {
    constructor(name, stats, abilities, frontImage, backImage) {
        this.name = name;
        this.stats = stats;
        this.abilities = abilities;
        this.frontImage = frontImage;
        this.backImage = backImage;
    }
}
let counter = 0;

function createPokemon(pokemon) {
    console.log('ajax');
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon}/`,
        type: "GET",
        dataType: "JSON",
        success: function(data) {
            console.log('test');
            //Link datapoints to variables
            let name = data.name,
                title = data.name,
                pic1 = data.sprites.front_default,
                pic2 = data.sprites.back_default,
                xP = data.base_experience,
                stat = {},
                abil = [],
                hp = data.stats[5].stat.name,
                hpLvl = data.stats[5].base_stat,
                attck = data.stats[4].stat.name,
                attckLvl = data.stats[4].base_stat,
                dfns = data.stats[3].stat.name,
                dfnsLVL = data.stats[3].base_stat,
                spd = data.stats[0].stat.name,
                spdLvl = data.stats[0].base_stat;

            //Set the stat object
            stat.hp = hpLvl;
            stat.attck = attckLvl;
            stat.dfns = dfnsLVL;
            stat.spd = spdLvl;

            //Set the ability array
            for (i = 0; i < data.abilities.length; i++) {
                let ability = data.abilities[i].ability.name;
                abil.push(`${ability}`);
            }
            // Move pokemon object to trainer
            title = new Pokemon(name, stat, abil, pic1, pic2);
            batman.pokemon.push(title);
            batman.getPokemon(title);
            counter++;
            let futureRef = ["#one!", "#two!", "#three!", "#four!", "#five!", "#six!", "#seven!", "#eight!", "#nine!", "#ten!", "#eleven!", "#twelve!"];

            //Waits for ajax to finish, then manipulate DOM
            if (counter === 3) {
                batman.allPokemon();
                console.log(batman);
                let render = function() {
                        // For loop to set href to carousel-items
                        for (let i = 0; i < batman.pokemon.length; i++) {
                            let reference;
                            if (i === 0) {
                                reference = futureRef[i];
                            } else if (i === 1) {
                                reference = futureRef[i];
                            } else if (i === 2) {
                                reference = futureRef[i];
                            } else {};
                            // creation of html card for carousel 
                            let card = `<div class="carousel-item z-depth-5" href="${reference}"><div class="card">
						    <div class="card-image waves-effect waves-block waves-light">
						    <img class="activator" src="${batman.pokemon[i].frontImage}">
						    </div>
						    <div class="card-content">
						    <span class="card-title activator grey-text text-darken-4">${batman.pokemon[i].name}<i class="material-icons right small">insert_chart</i></span>
						    </div>
						    <div class="card-reveal">
						    <span class="card-title grey-text text-darken-4">${batman.pokemon[i].name}<i class="material-icons right">close</i></span>
						 	<p>Stats</p> 
                            <p>hp: ${batman.pokemon[i].stats.hp} <br> attack: ${batman.pokemon[i].stats.attck} <br> defense: ${batman.pokemon[i].stats.dfns} <br> speed: ${batman.pokemon[i].stats.spd} <br></p>
						    <p>Abilities</p>
                             <p>${batman.pokemon[i].abilities.join(", ")}</p>
                             <div>
                            <img src="${batman.pokemon[i].backImage}">
                            </div>
						    </div>
					        </div>
					        </div>`;
                            $('.carousel').append(card);
                            $('.carousel').carousel();
                        }
                    }
                    // Render for initial set of pokemon
                render();
            }
            if (counter > 3) {
                let index = batman.pokemon.length - 1;
                console.log(index);
                console.log(futureRef[index]);
                let render = function() {
                        let card = `<div class="carousel-item z-depth-5" href="${futureRef[index]}"><div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${batman.pokemon[index].frontImage}">
                        </div>
                        <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${batman.pokemon[index].name}<i class="material-icons right small">insert_chart</i></span>
                        </div>
                        <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${batman.pokemon[index].name}<i class="material-icons right">close</i></span>
                        <p>Stats</p> 
                        <p>hp: ${batman.pokemon[index].stats.hp} <br> attack: ${batman.pokemon[index].stats.attck} <br> defense: ${batman.pokemon[index].stats.dfns} <br> speed: ${batman.pokemon[index].stats.spd} <br></p>
                        <p>Abilities</p>
                         <p>${batman.pokemon[index].abilities.join(", ")}</p>
                         <div>
                            <img src="${batman.pokemon[index].backImage}">
                          </div>
                        </div>
                        </div>
                        </div>`;

                        $('.carousel').append(card);
                    }
                    // Render for additional pokemon
                render();
                // Implementation of carousel functionality
                $('.carousel').carousel({
                    numVisible: batman.pokemon.length
                });
                let elem = $('.carousel');
                let instance = M.Carousel.getInstance(elem);
                instance.set(index);
            }
        },
        error: function(error) {
            console.log(error);
        }
    })
}
createPokemon('squirtle');
createPokemon('wartortle');
createPokemon('blastoise');
// Search function controls
$(document).ready(function() {
    $('form').on('submit', function() {
        event.preventDefault();
        let name = $('input[type=search]').val();
        console.log(name);
        createPokemon(name);
    });
});