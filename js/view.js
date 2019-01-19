class View {
    populateTemplate(str, data) {
        return str.replace(/{{(.*?)}}/g, (match, match2) => {
            return data[match2.trim()]
        })
    }
}

export default View
