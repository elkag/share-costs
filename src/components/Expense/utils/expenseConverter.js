/**
 *  {
    "description": "string",
    "groupId": "string",
    "total": number,
    "type": "string",
    "users": [
        {
        "amount": number,
        "id": "string",
        "userId": "string",
        "weight": number
        }
    ]
}
 */
export const convertToRequest = (group, expense) => {
    const request = {};
    request.description = expense.description;
    request.groupId = group.id;
    request.total = expense.totalInCents;
    request.type = expense.inputType;
    request.users = expense.users.map(current => {
        return { amount: current.amount.value , id: "", userId: current.id, weight: current.weight }
    })

    console.log(request)
    return request;
}
