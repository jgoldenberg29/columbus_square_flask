"""empty message

Revision ID: 8cbb7c2b6c4f
Revises: 0839f8884c8c
Create Date: 2024-03-26 12:22:21.983240

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8cbb7c2b6c4f'
down_revision = '0839f8884c8c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.BLOB(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.drop_column('image')

    # ### end Alembic commands ###
