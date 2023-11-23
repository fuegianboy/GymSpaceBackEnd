

module.exports = (conditions) => {

    const {
        sort_name,
        sort_category,
        sort_price,
        sort_startTime,
        sort_duration,
        sort_status,
        sort_coachId,
        sort_capacity,
        sort_areaId,
    } = conditions

    let order = []

    const addOrder = (field, direction) => {
        const directions = ["ASC", "DESC"]
        if (directions.includes(direction)) {
            order.push([field, direction]);
        }
    }

    addOrder("name", sort_name?.trim().toUpperCase());
    addOrder("category", sort_category?.trim().toUpperCase());
    addOrder("price", sort_price?.trim().toUpperCase());
    addOrder("startTime", sort_startTime?.trim().toUpperCase());
    addOrder("duration", sort_duration?.trim().toUpperCase());
    addOrder("status", sort_status?.trim().toUpperCase());
    addOrder("coachID", sort_coachId?.trim().toUpperCase());
    addOrder("capacity", sort_capacity?.trim().toUpperCase());
    addOrder("areaID", sort_areaId?.trim().toUpperCase());

    return order
}