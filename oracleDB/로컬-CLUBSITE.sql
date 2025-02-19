drop table basket;
drop table group_morak;
drop table comments;
drop table user_group;
drop table group_info;
drop table review;
drop table notification;
drop table notice;
drop table faq;
drop table charge;
drop table messages;
drop table visit_log
drop table member;


create sequence basket_seq 
start with 1 
increment by 1;

create sequence group_seq 
start with 1 
increment by 1;

create sequence comments_seq 
start with 1 
increment by 1;

create sequence member_group_seq 
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

create sequence transaction_seq
start with 1
increment by 1;

create sequence report_seq
start with 1
increment by 1;

create sequence notification_seq
start with 1
increment by 1;
-- 모임장바구니
create table basket(
    basket_no number(6) not null,
    no number(6) not null,
    group_no number(6) not null,
    price number(6),                    --비용
    reg_date date default sysdate,       --신청일
    start_date date,                     --모임시작일
    last_date date,                      --모임종료일
    status varchar2(20),                --찜, 승인대기, 종료
    primary key(basket_no)
);
ALTER TABLE BASKET
ADD CONSTRAINT unique_basket UNIQUE (NO, GROUP_NO);

select * from group_morak;
-- 모임
create table group_morak(
    group_no number(6) not null,
    no number(6) not null,              --모임장
    group_title varchar2(100),                --모임명
    reg_date date default sysdate,       --개설일
    category varchar2(50),                 --카테고리
    user_max number(3),                 --최대모임원
    price number(6),                    --비용
    area varchar2(50),                  --모임구역
    addr1 varchar2(100),              --일반주소
    addr2 varchar2(100),       --상세주소
    latitude varchar2(30),              --위도
    longitude varchar2(30),             --경도
    start_date date,                     --모임시작일
    last_date date,                      --모임종료일
    comment1 varchar2(500),             --자기PR
    comment2 varchar2(1000),             --모임소개글 
    approval varchar2(20) DEFAULT 'N',                --관리자 승인여부
    views number(6),                    --조회수
     img_url1 varchar2(100),               --이미지1
    img_url2 varchar2(100),               --이미지2
    img_url3 varchar2(100),               --이미지3
    type varchar2(20),                   --정기모임,소모임 구분
    primary key(group_no)
);

alter table group_morak modify img_url1 varchar2(100);
alter table group_morak modify img_url2 varchar2(100);
alter table group_morak modify img_url3 varchar2(100);
alter table member_group add pr varchar2(500);



-- 댓글(답변형)
create table comments(
    comments_no number(6) not null,
    no number(6) not null,
    review_no number(6) not null,
    content varchar2(255),
    ref number(5,0) default 0,
    step number(3,0) default 0,
    depth number(3,0) default 0,
    num_ref number(7,0) default 0,
    nickname varchar2(50),               --닉네임
    reg_date date default sysdate,
    isblacked varchar2(10) default 'N',
    primary key(comments_no)
);
select * from member;
update member set id = 'aaaaa' where phone = 01049245948;
delete from member where no = 41;
commit;

create table member_group(
    member_group_no number(6),
    no number(6) not null,
    group_no number(6) not null,
    status varchar2(20),             --승인대기, 멤버, 모임장
    primary key(member_group_no)
);
--같은 유저가 같은 모임 두번 신청 못하게 unique처리
ALTER TABLE MEMBER_GROUP
ADD CONSTRAINT UNIQUE_MEMBER_GROUP UNIQUE (NO, GROUP_NO);


-- 리뷰게시판
create table review(
    review_no number(6) not null,
    no number(6) not null,
    group_no number(6) not null,
    review_title varchar2(50),
    img_url varchar2(50),
    content varchar2(255),
    views number(6),                     --조회수
    comments number(4),                  --댓글수
    star number(1) default 0,            --별점
    category varchar2(50),     --카테고리
    reg_date DATE DEFAULT SYSDATE,
    isblacked varchar2(10) default 'N',
    primary key(review_no)

);
ALTER TABLE member MODIFY img_url VARCHAR2(255);
commit;
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
    img_url varchar2(255) default '',                 --사진
    self_pr varchar2(255) default '',               --자기소개
    primary key(no)
);
commit;
update member set provider = 'kakao' where no =26;
select * from member;

SELECT *
		FROM Member
		WHERE ID =  'aaaaa' AND PROVIDER = 'none'; 
        INSERT INTO member (
		no, email, name, nickname, birth, gender, zip_code, addr1, addr2,
		provider, provider_id
		) VALUES ( 
		member_seq.nextval, 1,2, 3,
		sysdate, 1, 1, 1,
		1, 1, 1
		);
-- 알림
create table notification(
    notification_no number(6) not null,
    no number(6) not null,
    content varchar2(255),
    is_read varchar2(1) default 'N',     --읽음여부
    reg_date date default sysdate,        --알림일
    primary key(notification_no)
);
insert into notification (notification_no,no,content) values (notification_seq.nextval, 45,'안녕하세요');
commit;
-- 공지사항
create table notice(
    notice_no number(6) not null,
   notice_title varchar2(50),
    content varchar2(255),
    reg_date date default sysdate,
    primary key(notice_no)
);



-- FAQ
create table faq(
    faq_no number(6) not null,
    faq_title varchar2(50),
    reg_date date default sysdate,
    content varchar2(255),
    primary key(faq_no)
);



--코인 충전 내역 테이블
create table charge(
    charge_no number(6)  not null,
    amount number(6),          ---충전금액
    reg_date date,
    no number(6) not null,   ---사용자 pk
    primary key(charge_no)
);



-- 채팅내역 DB 저장
CREATE TABLE messages (
    message_no number(6),
    sender VARCHAR2(100) NOT NULL,
    content CLOB NOT NULL,
    timestamp NUMBER NOT NULL,
    room_code VARCHAR2(50) NOT NULL,
    firebase_message_id VARCHAR2(255) UNIQUE,
    primary key(message_no)
);
select * from messages;

-- 방문기록
create table visit_log(
    v_id number(6),
    ip varchar2(50),
    visit_date date default sysdate,
    visit_url varchar2(300),
    primary key(v_id)
    );

--거래내역 테이블
drop table transaction;
create table Transaction_log(
    transaction_no number(6),
    no number(6),
    type varchar2(100),
    amount number(7),
    reg_date date default sysdate,
    primary key(transaction_no)
);
INSERT INTO Transaction_log (transaction_no, no, type, amount)  
VALUES (2, 22, 'Deposit', 50000);
commit;
select * from transaction_log;
insert into Transaction_log values (transaction_seq.nextval,3,3,3,sysdate);

-- 신고
create table report(
    rep_no number(6),
    reporter varchar2(50),
    reported varchar2(50),
    reason varchar2(255),
    rep_date date,
    rep_status varchar2(1),
    primary key(rep_id)
    );