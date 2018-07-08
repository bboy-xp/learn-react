import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
const ADD_GAMES = gql`
    mutation addGames($name: String,$price:String) {
        addGames(name: $name,price:$price) {
            name
            price
        }
    }
`;
const GET_GAMES = gql`
    query games {
        games {
            name
            price
        }
    }
`;
const QueryComponent = () => (
    <Query query={GET_GAMES} >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return data.games.map((game) => (
                <div key={game.name}>
                    <p>{`${game.name}: ${game.price}`}</p>
                </div>
            ));
        }}
    </Query>
);
const MutationComponent = () => {
    let input1, input2;
    return (
        <Mutation
            mutation={ADD_GAMES}
            update={(cache, { data }) => {
                const { games } = cache.readQuery({ query: GET_GAMES });
                console.log(`readQuery:::`, data)
                cache.writeQuery({
                    query: GET_GAMES,
                    data: { games: games.concat() }
                });
            }}
        >
            {(addGames, { data }) => (
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            addGames({ variables: { name: input1.value, price: input2.value } });
                            input1.value = "";
                            input2.value = "";
                        }}
                    >
                        name:<input
                            ref={node => {
                                input1 = node;
                            }}
                        />
                        <br />
                        price :<input
                            ref={node => {
                                input2 = node;
                            }}
                        />
                        <br />
                        <button type="submit">Add Game</button>
                    </form>
                </div>
            )}
        </Mutation>
    )
};

class MyComponent extends Component {
    render() {
        return <div>
            查看游戏:::<QueryComponent></QueryComponent>
            添加游戏:::<MutationComponent></MutationComponent>
        </div>;
    }
}

export default MyComponent;