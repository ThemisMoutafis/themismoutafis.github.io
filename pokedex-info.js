document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the form submission
    document.getElementById('textForm').addEventListener('submit', async function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
  
      const inputText = document.getElementById('inputText').value.trim(); // Get the input value

      let correctedInput = inputText; // Initialize corrected input with user input by default

    // Define your correction mapping
    const corrections = {
      'raticate-alolan': 'raticate-alola',
      'raichu-alolan' : 'raichu-alola',
      'sandshrew-alolan' : 'sandshrew-alola',
      'sandslash-alolan' : 'sandslash-alola',
      'vulpix-alolan' : 'vulpix-alola',
      "ninetales-alolan" : 'ninetales-alola',
      "diglett-alolan" : 'diglett-alola',
      "dugtrio-alolan":'dugtrio-alola',
      "meowth-alolan":'meowth-alola',
      "persian-alolan":'persian-alola',
      "geodude-alolan":'geodude-alola',
      "graveler-alolan":'graveler-alola',
      "golem-alolan":'golem-alola',
      "grimer-alolan" : 'grimer-alola',
      "muk-alolan" : 'muk-alola',
      "exeggutor-alolan" : 'exeggutor-alola',
      "marowak-alolan" : 'marowak-alola',
      "growlithe-hisuian": 'growlithe-hisui',
      "arcanine-hisuian" : 'arcanine-hisui',
      "voltorb-hisuian" : 'voltorb-hisui',
      "electrode-hisuian" : 'electrode-hisui',
      "typhlosion-hisuian" : 'typhlosion-hisui',
      "qwilfish-hisuian" : 'qwilfish-hisui',
      "sneasel-hisuian" :'sneasel-hisui',
      "samurott-hisuian": 'samurott-hisui',
      "lilligant-hisuian" : 'lilligant-hisui',
      "zorua-hisuian" : 'zorua-hisui',
      "zoroark-hisuian" : 'zoroark-hisui',
      "braviary-hisuian" : 'braviary-hisui',
      "sliggoo-hisuian" : 'sliggoo-hisui',
      "goodra-hisuian" : 'goodra-hisui',
      "avalugg-hisuian" : 'avalugg-hisui',
      "decidueye-hisuian" : 'decidueye-hisui',
      "wooper-paldean" : 'wooper-paldea',
      "tauros-paldean": "tauros-paldea-combat-breed",
      "tauros-blaze" : "tauros-paldea-blaze-breed",
      "tauros-aqua": "tauros-paldea-aqua-breed",
      "venusaur-gigantamax": 'venusaur-gmax',
      "charizard-gigantamax": 'charizard-gmax',
      "blastoise-gigantamax": 'blastoise-gmax',
      "butterfree-gigantamax": 'butterfree-gmax',
      "pikachu-gigantamax": 'pikachu-gmax',
      "meowth-gigantamax": 'meowth-gmax',
      "machamp-gigantamax": 'machamp-gmax',
      "gengar-gigantamax": 'gengar-gmax',
      "kingler-gigantamax": 'kingler-gmax',
      "lapras-gigantamax": 'lapras-gmax',
      "eevee-gigantamax": 'eevee-gmax',
      "snorlax-gigantamax": 'snorlax-gmax',
      "garbodor-gigantamax": 'garbodor-gmax',
      "melmetal-gigantamax": 'melmetal-gmax',
      "rillaboom-gigantamax": 'rillaboom-gmax',
      "cinderace-gigantamax": 'cinderace-gmax',
      "inteleon-gigantamax": 'inteleon-gmax',
      "corviknight-gigantamax" : 'corviknight-gmax',
      "orbeetle-gigantamax" : 'orbeetle-gmax',
      "drednaw-gigantamax" : 'drednaw-gmax',
      "coalossal-gigantamax" : 'coalossal-gmax',
      "flapple-gigantamax" : 'flapple-gmax',
      "appletun-gigantamax": 'appletun-gmax',
      "sandaconda-gigantamax" : 'sandaconda-gmax',
      "centiskorch-gigantamax" : 'centiskorch-gmax',
      "hatterene-gigantamax" : 'hatterene-gmax',
      "grimmsnarl-gigantamax" : 'grimmsnarl-gmax',
      "alcremie-gigantamax" : 'alcremie-gmax',
      "copperajah-gigantamax": 'copperajah-gmax',
      "duraludon-gigantamax" : 'duraludon-gmax'
      
  //     Add more corrections as needed
    };

    // Check if userInput needs correction
    if (corrections.hasOwnProperty(inputText)) {
      correctedInput = corrections[inputText]; // Correct the input silently
    }

      const url = `https://pokeapi.co/api/v2/pokemon/${correctedInput}`;
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Parse JSON response
  
        console.log(`Name: ${data.name}`);
        console.log(`Type 1: ${data.types[0].type.name}`);
        if (data.types.length > 1 && data.types[1].type.name != null) {
          console.log(`Type 2: ${data.types[1].type.name}`);
        }


      // Creating type1 and type2 strings
      let type1 = `<strong>Type 1:</strong> ${data.types[0].type.name}`;
      let type2 = data.types.length > 1 ? `<strong>Type 2:</strong> ${data.types[1].type.name}` : '';

      // Accessing and updating info-dump div
      const infoDumpDiv = document.getElementById('info-dump');
      infoDumpDiv.innerHTML = '';

      // Constructing HTML content
      let htmlContent = `<p>${type1}</p>`;
      if (type2) {
        htmlContent += `<p>${type2}</p>`;
      }

      // Set innerHTML of info-dump
      infoDumpDiv.innerHTML = htmlContent;

      // Continue with other data handling or output as needed


        console.log(`Ability 1: ${data.abilities[0].ability.name}`);
        if (data.abilities.length > 1 && data.abilities[1].ability.name != null) {
          console.log(`Ability 2: ${data.abilities[1].ability.name}`);
        }



      // Creating type1 and type2 strings
      let ability1 = `<strong>Ability 1:</strong> ${data.abilities[0].ability.name}`;
      let ability2 = data.abilities.length > 1 ? `<strong>Ability 2:</strong> ${data.abilities[1].ability.name}` : '';

      let ability3 = data.abilities.length > 2 ? `<strong>Ability 3:</strong> ${data.abilities[2].ability.name}` : '';

      
      // Constructing HTML content
       htmlContent += `<p>${ability1}</p>`;
      if (ability2) {
        htmlContent += `<p>${ability2}`;
        if(data.abilities[1].is_hidden) {
          htmlContent +=" "+ '(hidden)'
        }
        htmlContent += `</p>`
      }
      if(ability3) {
        htmlContent += `<p>${ability3}`;
        if(data.abilities[2].is_hidden) {
          htmlContent +=" "+ '(hidden)'
        }
        htmlContent += `</p>`
      }
      

      // Set innerHTML of info-dump
      infoDumpDiv.innerHTML = htmlContent;

      // Continue with other data handling or output as needed


        console.log("Moves:");
  
        for (const move of data.moves) {
          const urlMove = `https://pokeapi.co/api/v2/move/${move.move.name}`;
          try {
            const moveResponse = await fetch(urlMove);
            if (!moveResponse.ok) {
              throw new Error("Network response was not ok");
            }
            const moveData = await moveResponse.json(); // Parse JSON response
  
            const versionDetails = move.version_group_details[0];
            console.log(
              `- ${move.move.name}, Level Learned: ${versionDetails.level_learned_at}, Method: ${versionDetails.move_learn_method.name}, Accuracy: ${moveData.accuracy}, Power: ${moveData.power}`
            );
          } catch (error) {
            console.error("Error fetching move data:", error);
          }
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    });
  });
  
