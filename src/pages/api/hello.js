// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from "@components/db/config";

const Handler = async (req, res) => {
  try {
    const bulkValues = req.body.map((values) => values);

    const placeholders = bulkValues.map(() => "(?)").join(", ");
    const values = bulkValues.flat();

    const result = await excuteQuery({
      query: `INSERT INTO items(qr) VALUES${placeholders}`,
      values: values,
    });

    return res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default Handler;
