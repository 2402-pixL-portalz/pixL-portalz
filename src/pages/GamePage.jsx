import { useEffect } from "react";

const GamePage = ({ game }) => {

	let progress = [false, false, false, false, false, false, false, false, false, false];

	useEffect(() => {

		const fetchFunc = async() => {
			
			try {
				const result = await fetch(`/api/v1/levels/all`, {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `bearer ${localStorage.getItem('token')}`
					},
				});

				const json = await result.json();

				const output = [];
				for(let i = 0; i < json.length; i++) {
					output.push(json[i].isCompleted);
				}
				// console.log(`json`, json)
				// console.log(`output`, output);
		
				progress = output;

				game.transferState(progress);
				
			} catch (error) {
				console.log(error);
			}
	
			
		}

		fetchFunc();

	}, []);

	game.createGame(progress);
	game.transferState(progress);
	
	// return <h1>Game page</h1>;
};




export default GamePage;
