export function configureFakeBackend() {
    let users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];
    let sets = [
        { userId: 1,
            sets: [
                { id: 1, name: "eng words", description: "no description :(", cards: [{ id: 1, wordEn: "dog", wordRu: "собака"}, { id: 2, wordEn: "cat", wordRu: "кошка"},
                                                     { id: 3, wordEn: "boat", wordRu: "лодка"}, { id: 4, wordEn: "word", wordRu: "слово"}
                                                     ]},
                { id: 2, name: "set2", description: "no description :(", cards: [{ id: 1, wordEn: "dog", wordRu: "собака"}, { id: 2, wordEn: "cat", wordRu: "кошка"},
                        { id: 3, wordEn: "boat", wordRu: "лодка"}, { id: 4, wordEn: "word", wordRu: "слово"}
                    ]},
                { id: 3, name: "set3", description: "no description :(", cards: [{ id: 1, wordEn: "dog", wordRu: "собака"}, { id: 2, wordEn: "cat", wordRu: "кошка"},
                        { id: 3, wordEn: "boat", wordRu: "лодка"}, { id: 4, wordEn: "word", wordRu: "слово"}
                    ]},
                { id: 4, name: "set4", description: "no description :(", cards: [{ id: 1, wordEn: "dog", wordRu: "собака"}, { id: 2, wordEn: "cat", wordRu: "кошка"},
                        { id: 3, wordEn: "boat", wordRu: "лодка"}, { id: 4, wordEn: "word", wordRu: "слово"}
                    ]},
                { id: 5, name: "set5", description: "no description :(", cards: [{ id: 1, wordEn: "dog", wordRu: "собака"}, { id: 2, wordEn: "cat", wordRu: "кошка"},
                        { id: 3, wordEn: "boat", wordRu: "лодка"}, { id: 4, wordEn: "word", wordRu: "слово"}
                    ]}
                    ]}];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const isLoggedIn = opts.headers['Authorization'] === 'Bearer fake-jwt-token';

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    const user = users.find(x => x.username === params.username && x.password === params.password);
                    if (!user) return error('Username or password is incorrect');
                    return ok({
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    });
                }

                if (url.endsWith('/api/sets') && opts.method === 'POST') {
                    if (!isLoggedIn) return unauthorised();
                    const params = JSON.parse(opts.body);
                    const resultSets = sets.find(x => x.userId === params.userId);
                    console.log(resultSets);
                    return ok({
                        sets: resultSets
                    });
                }

                if (url.startsWith('/api/set/') && opts.method === 'POST') {
                    if (!isLoggedIn) return unauthorised();
                    const params = JSON.parse(opts.body);
                    const resultSets = sets.find(x => x.userId === params.userId).sets;
                    const resultSet = resultSets.find(x => String(x.id) === params.setId);
                    console.log(resultSets, resultSet, params.setId);
                    return ok({
                        set: resultSet
                    });
                }

                // get users - secure
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    return ok(users);
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

                // private helper functions

                function ok(body) {
                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
                }

                function unauthorised() {
                    resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
                }

                function error(message) {
                    resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
                }
            }, 500);
        });
    }
}