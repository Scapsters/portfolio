interface Data {
    info: string;
}

class DataWithContext {
    public info: string;

    public constructor(data: Data) {
        this.info = data.info;
    }
}

const createDataWithContext = (data: Data) => new DataWithContext(data);

const data1: Data = { info: "Hello" };
const data2: Data = { info: "hello!" };

const AllDataShortened = {
    CategoryName: {
        data1: createDataWithContext(data1),
        data2: createDataWithContext(data2)
    }
}

// Access statically
const v = AllDataShortened.CategoryName.data1