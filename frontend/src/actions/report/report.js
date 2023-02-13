export const enroll_report = async (report_type, content, review_id, chat_room_id, callback) => {
    const body = JSON.stringify({
        report_type, content, review_id, chat_room_id
    });

    try {
        const res = await fetch('/api/report', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        if (res.status === 201) {
            if (callback) callback([true, data.success]);
        } else {
            if (callback) callback([false, data.error]);
        }
    } catch(error) {
        if (callback) callback([false, error]);
    }
};
