import mongoose, {Schema} from 'mongoose'
import { INote } from '@/interfaces/interface'

const NoteSchema = new Schema<INote>(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: Schema.Types.Mixed,
            default: {}
        },
        tags: [
            {type: String, trim: true}
        ],
        links: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Note'
            }
        ]
    },
    {
        timestamps: true
    }
)

NoteSchema.index({title: 'text', tags: 'text'})

const NoteModel: mongoose.Model<INote> =
  mongoose.models?.Note || mongoose.model<INote>("Note", NoteSchema);

export default NoteModel;