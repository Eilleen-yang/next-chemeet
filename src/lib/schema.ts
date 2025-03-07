import mongoose from "mongoose";

const subLabelValue = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
});

// 유저
const user = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
    name: { type: String, required: true },
    profile_img: { type: String, default: null },
    phone: { type: String },
    role: { type: String, enum: ["user", "pro", "admin"], default: "user" },
    position_tag: { type: String, default: "" },
    introduce: { type: String, default: "" },
    my_category: { type: [subLabelValue], default: [] },
    provider: { type: String },
    providerAccountId: { type: String },
  },
  { timestamps: true }
);

// 마이페이지
const mypage = new mongoose.Schema({
  myStudy: [{ type: [String], default: [] }],
  likeStudy: [{ type: [String], default: [] }],
  myPost: [{ type: [String], default: [] }],
});

const subReply = new mongoose.Schema(
  {
    replyId: { type: String, required: true },
    content: { type: String, required: true },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// 댓글
const comment = new mongoose.Schema(
  {
    postId: { type: String, required: true },
    commentId: { type: String, required: true },
    content: { type: String, required: true },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reply: [subReply],
  },
  { timestamps: true }
);

// 커뮤니티
const post = new mongoose.Schema(
  {
    postId: { type: String },
    category: {
      value: { type: String, required: true },
      label: { type: String, required: true },
      isRecruiting: { type: Boolean, default: true },
    },
    contents: {
      title: { type: String, required: true },
      body: { type: String, required: true },
      linkedStudyId: { type: String, default: null },
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const subStudyInfo = new mongoose.Schema({
  thumbnailUrl: { type: String, default: null },
  title: { type: String, required: true },
  jobCategory: { type: subLabelValue, required: true },
  targetCategory: { type: subLabelValue, required: true },
  expense: { type: Number, required: true },
  recruitmentPeople: { type: Number, required: true },
  recruitmentPeriod: { type: [String], default: [] },
  studyPeriod: { type: [String], default: [] },
  location: { type: subLabelValue, required: true },
  place: { type: String, default: null },
});

const subContents = new mongoose.Schema({
  content: { type: String, default: "", required: true },
  rules: { type: [String], default: [] },
  curriculums: { type: [String], default: [] },
});

// 스터디
const study = new mongoose.Schema(
  {
    studyId: { type: String },
    studyInfo: { type: subStudyInfo, required: true },
    contents: { type: subContents, required: true },
    heartCount: { type: Number, default: 0 },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// 스터디 찜
const studyLike = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  studyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Study",
    required: true,
  },
});

// 스터디 지원
const studyApply = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  studyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Study",
    required: true,
  },
});

// 글 좋아요
const postLike = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

// 알림 count
const alert = new mongoose.Schema({
  userId: { type: String, required: true },
  alertList: [
    {
      type: { type: String, enum: ["post", "study"], required: true },
      typeId: { type: String, required: true },
      title: { type: String, required: true },
      comments: [
        {
          comment: { type: String, default: "" },
          read: { type: Boolean, default: false },
        },
      ],
    },
  ],
  allRead: { type: Boolean, default: false },
});

export const User = mongoose.models?.User || mongoose.model("User", user);
export const Mypage =
  mongoose.models?.Mypage || mongoose.model("Mypage", mypage);
export const Post = mongoose.models?.Post || mongoose.model("Post", post);
export const Study = mongoose.models?.Study || mongoose.model("Study", study);
export const Comment =
  mongoose.models?.Comment || mongoose.model("Comment", comment);
export const StudyLike =
  mongoose.models?.StudyLike || mongoose.model("StudyLike", studyLike);
export const StudyApply =
  mongoose.models?.StudyApply || mongoose.model("StudyApply", studyApply);
export const PostLike =
  mongoose.models?.PostLike || mongoose.model("PostLike", postLike);
export const Alert = mongoose.models?.Alert || mongoose.model("Alert", alert);
