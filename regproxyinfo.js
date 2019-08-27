exports.set = (proxy, name, slogan, philosophy, background, website, logo, contact) => {
    action.require_auth(proxy);
    const proxies = db.proxies(action.receiver, action.receiver);
    const itr = proxies.find(proxy);
    const data = {
        owner: proxy,
        name, slogan, philosophy, background,
        website, logo, contact
    }
    console.log(data)
    if (itr.is_end()) {
        proxies.emplace(action.account, data);
    } else {
        for (const key in data) {
            if (data[key] != "") {
                itr.data[key] = data[key]
            }
        }
        itr.update(action.account);
    }
};
exports.remote = (proxy) => {
    action.require_auth(proxy);
    const proxies = db.proxies(action.receiver, action.receiver);
    const itr = proxies.find(proxy);
    itr.remove();
};