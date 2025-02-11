drop table basket;
drop table group1;
drop table comment1;
drop table user_group;
drop table group_info;
drop table review;
drop table member;
drop table notification;
drop table notice;
drop table faq;
drop table charge;
drop table messages;


create sequence basket_seq 
start with 1 
increment by 1;

create sequence group1_seq 
start with 1 
increment by 1;

create sequence comment1_seq 
start with 1 
increment by 1;

create sequence user_group_seq 
start with 1 
increment by 1;

create sequence group_info_seq 
start with 1 
increment by 1;

create sequence review_seq 
start with 1 
increment by 1;

create sequence member_seq 
start with 1 
increment by 1;

create sequence notification_seq 
start with 1 
increment by 1;

create sequence notice_seq 
start with 1 
increment by 1;

create sequence faq_seq 
start with 1 
increment by 1;

create sequence charge_seq 
start with 1 
increment by 1;

create sequence messages_seq 
start with 1 
increment by 1;

create sequence visit_seq
start with 1
increment by 1;
-- 모임장바구니
create table basket(
    b_id number(6) not null,
    id number(6) not null,
    g_id number(6) not null,
    price number(6),                    --비용
    reg_date date default sysdate,       --신청일
    start_date date,                     --모임시작일
    last_date date,                      --모임종료일
    status varchar2(20),                --찜, 승인대기, 종료
    primary key(b_id)
);



-- 모임
create table group1(
    g_id number(6) not null,
    id number(6) not null,              --모임장
    g_title varchar2(100),                --모임명
    reg_date date default sysdate,       --개설일
    category varchar2(50),                 --카테고리
    user_max number(3),                 --최대모임원
    price number(6),                    --비용
    area varchar2(50),                  --모임구역
    address varchar2(100),              --일반주소
    latitude varchar2(30),              --위도
    longitude varchar2(30),             --경도
    detail_address varchar2(100),       --상세주소
    start_date date,                     --모임시작일
    last_date date,                      --모임종료일
    comment1 varchar2(255),             --자기PR
    comment2 varchar2(255),             --모임소개글
    status varchar2(20),                --관리자 승인여부
    views number(6),                    --조회수
    img_url varchar2(50),               --이미지
    type varchar2(20),                   --정기모임,소모임 구분
    primary key(g_id)
);



-- 댓글(답변형)
create table comment1(
    c_id number(6) not null,
    id number(6) not null,
    r_id number(6) not null,
    content varchar2(255),
    ref number(5,0) default 0,
    step number(3,0) default 0,
    depth number(3,0) default 0,
    num_ref number(7,0) default 0,
    nickname varchar2(50),               --닉네임
    reg_date date default sysdate,
    primary key(c_id)
);



-- 모임-사용자
create table user_group(
    u_g_id number(6),
    id number(6) not null,
    g_id number(6) not null,
    status varchar2(20)                  --찜, 승인대기, 멤버, 모임장
);



-- 모임 이미지
create table group_info(
    g_info_id number(6) not null,
    g_id number(6) not null,
    img_url varchar2(50),                 --사진
    primary key(g_info_id)
);



-- 리뷰게시판
create table review(
    r_id number(6) not null,
    id number(6) not null,
    g_id number(6) not null,
    r_title varchar2(50),
    img_url varchar2(50),
    content varchar2(255),
    views number(6),                     --조회수
    comments number(4),                  --댓글수
    star number(1) default 0,            --별점
    category varchar2(50),               --카테고리
    primary key(r_id)
);

select * from member;
drop table member;
-- 사용자
create table member(
    no number(6) not null,
    role number(1) default 1,
    id varchar2(100),             -- 자체 회원가입 시 아이디
    pw varchar2(100),             --자체 회원가입 시 비밀번호
    email varchar2(100),
    provider varchar2(100)  default 'none',               --OAuth 제공자(google, naver 등)
    provider_id varchar2(100) default 'none',            --OAuth 제공자의 고유 아이디
    phone varchar2(20),
    name varchar2(20),
    nickname varchar2(50),               --닉네임
    birth date,
    gender varchar2(6),
    money number(10) default 0,          --소지금
    zip_code varchar2(10),
    addr1 varchar2(50),
    addr2 varchar2(50),
    star_sum number(6) default 0,        --별점총합
    black number(6) default 0,           --신고횟수
    reg_date date default sysdate,        --가입일
    img_url varchar2(50) default '',                 --사진
    self_pr varchar2(255) default '',               --자기소개
    primary key(id)
);

SELECT *
		FROM Member
		WHERE ID =  'aaaaa' AND PROVIDER = 'none'; 

-- 알림
create table notification(
    n_id number(6) not null,
    id number(6) not null,
    content varchar2(255),
    is_read varchar2(1) default 'N',     --읽음여부
    reg_date date default sysdate,        --알림일
    primary key(n_id)
);


-- 공지사항
create table notice(
    n_id number(6) not null,
    n_title varchar2(50),
    content varchar2(255),
    reg_date date default sysdate,
    primary key(n_id)
);



-- FAQ
create table faq(
    n_id number(6) not null,
    f_title varchar2(50),
    reg_date date default sysdate,
    content varchar2(255)
);



--코인 충전 내역 테이블
create table charge(
    id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY PRIMARY KEY,
    amount number(6),          ---충전금액
    reg_date date,
    u_id number(6) not null   ---사용자 pk
);



-- 채팅내역 DB 저장
CREATE TABLE messages (
    id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY PRIMARY KEY,
    sender VARCHAR2(100) NOT NULL,
    content CLOB NOT NULL,
    timestamp NUMBER NOT NULL,
    room_code VARCHAR2(50) NOT NULL,
    firebase_message_id VARCHAR2(255) UNIQUE
);


-- 방문 기록 테이블 추가
create table visit_log(
    v_id number(6),
    ip varchar2(50),
    visit_time timestamp default current_timestamp,
    visit_url varchar2(300),
    primary key(v_id)
);

